import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';

const OUTPUT_CHANNEL = vscode.window.createOutputChannel('Origin');

/**
 * Runs an Origin source file the same way the Python extension runs a .py file:
 * either in an integrated terminal (default, supports interactive `input`) or
 * captured into the Origin output channel.
 *
 * @param filePath Absolute path to the .or file to run.
 */
export async function runOriginFile(filePath: string): Promise<void> {
  const config = vscode.workspace.getConfiguration('origin');
  const runnerCommand: string = config.get<string>('runnerCommand', 'origin');
  const runnerArgs: string[] = config.get<string[]>('runnerArgs', []);
  const runInTerminal: boolean = config.get<boolean>('runInTerminal', true);

  const fileDir = path.dirname(filePath);
  const args = [...runnerArgs, filePath];

  // Show the command that will run so users can verify / tweak settings.
  vscode.window.showInformationMessage(
    `Running Origin file: ${path.basename(filePath)}`
  );

  if (runInTerminal) {
    const terminal = vscode.window.createTerminal({
      name: 'Origin',
      cwd: fileDir,
    });
    terminal.show();
    // Quote each argument so paths with spaces are handled correctly.
    const quotedArgs = args.map((a) => (a.includes(' ') ? `"${a}"` : a));
    terminal.sendText(`${runnerCommand} ${quotedArgs.join(' ')}`);
    return;
  }

  // Captured output mode.
  OUTPUT_CHANNEL.clear();
  OUTPUT_CHANNEL.show(true);
  OUTPUT_CHANNEL.appendLine(`> ${runnerCommand} ${args.join(' ')}`);
  OUTPUT_CHANNEL.appendLine(`Working directory: ${fileDir}`);
  OUTPUT_CHANNEL.appendLine('');

  return new Promise<void>((resolve, reject) => {
    const proc = child_process.spawn(runnerCommand, args, {
      cwd: fileDir,
    });

    let output = '';
    proc.stdout.on('data', (data: Buffer) => {
      const text = data.toString();
      output += text;
      OUTPUT_CHANNEL.append(text);
    });
    proc.stderr.on('data', (data: Buffer) => {
      const text = data.toString();
      output += text;
      OUTPUT_CHANNEL.append(text);
    });

    proc.on('close', (code: number | null) => {
      OUTPUT_CHANNEL.appendLine(
        `\n[Origin process exited with code ${code}]`
      );
      if (code && code !== 0) {
        reject(new Error(`Origin process exited with code ${code}`));
      } else {
        resolve();
      }
    });

    proc.on('error', (err: Error) => {
      OUTPUT_CHANNEL.appendLine(`\n[Error: ${err.message}]`);
      reject(err);
    });
  });
}
