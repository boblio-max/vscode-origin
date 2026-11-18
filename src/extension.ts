import * as vscode from 'vscode';
import { runOriginFile } from './runOrigin';

export function activate(context: vscode.ExtensionContext): void {
  console.log('Origin language extension is now active!');

  const runCommand = vscode.commands.registerCommand(
    'origin.runFile',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor.');
        return;
      }

      const doc = editor.document;
      if (doc.languageId !== 'origin') {
        vscode.window.showErrorMessage('Active file is not an Origin (.or) file.');
        return;
      }

      await runOriginFile(doc.uri.fsPath);
    }
  );

  context.subscriptions.push(runCommand);
}

export function deactivate(): void {
  // Nothing to clean up.
}
