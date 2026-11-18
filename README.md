# Origin Language VS Code Extension

Syntax highlighting, running, and language support for the Origin programming language (`.or` files).

## Features

- **Syntax highlighting** for `.or` files using a TextMate grammar
- **Run Origin files** — execute the active `.or` file just like the Python extension runs `.py` files
- **Language configuration** with comments, brackets, indentation, and auto-closing pairs
- **File association** for the `.or` extension

## About Origin

Origin is an English-like programming language with strict typing, hardware-first GPIO/servo primitives for Raspberry Pi, and a full Python ecosystem underneath. It compiles to bytecode and runs on a stack VM.

Key features of Origin:
- `let` / `const` declarations with type annotations
- `if` / `elif` / `else`, `while`, `for` loops
- `def` / `func` function definitions
- `class` definitions with `self`
- `print` statements (not functions)
- `py { ... }` blocks for embedded Python
- `rust { ... }` blocks for embedded Rust
- Hardware primitives: `i2c`, `spi`, `uart`
- Low-level memory ops: `sizeof`, `peek`, `poke`, `pack`, `unpack`, `syscall`, `call_addr`
- Dialect system via `origin.toml`

## Installation

### From VSIX

1. Download the `.vsix` file from the [Releases](https://github.com/boblio-max/vscode-origin/releases) page
2. In VS Code, run **Extensions: Install from VSIX...**
3. Select the downloaded file

### From Source

```bash
# Clone the repository
git clone https://github.com/boblio-max/vscode-origin.git
cd vscode-origin

# Install dependencies
npm install

# Compile
npm run compile

# Package
npm run package

# Install the generated .vsix
code --install-require-checks origin-language-0.2.0.vsix
```

## Usage

Open any `.or` file and run it:

- Click the **▶ Run Origin** play button in the editor title bar, or
- Open the Command Palette (`Ctrl+Shift+P`) → **Origin: Run File**, or
- Press **Ctrl+F5**

Output appears in an integrated terminal by default (so interactive `input` works). You can switch to captured output in the **Origin** output panel via settings.

## Settings

| Setting | Default | Description |
|---|---|---|
| `origin.runnerCommand` | `origin` | Command used to run an Origin file (e.g. `origin` or `python`). |
| `origin.runnerArgs` | `[]` | Extra arguments passed to the runner before the file path. |
| `origin.runInTerminal` | `true` | Run in an integrated terminal (`true`) or capture output in the Origin panel (`false`). |

### Using with origin-dev

If you're developing Origin itself and want to run files from `origin-dev/ORIGIN_CODE/runners/runner.py`:

```json
{
  "origin.runnerCommand": "python",
  "origin.runnerArgs": ["<absolute/path/to>/origin-dev/ORIGIN_CODE/runners/runner.py"]
}
```

Or install the `origin-or` pip package so the `origin` CLI is on your `PATH`:

```bash
pip install origin-or
# then run files with just: origin <file.or>
```

## Development

```bash
# Install dependencies
npm install

# Watch for changes and compile
npm run watch

# Package for distribution
npm run package

# Publish to VS Code Marketplace
npm run publish
```

## Grammar

The TextMate grammar (`syntaxes/origin.tmGrammar.json`) provides syntax highlighting for:
- Keywords (`let`, `const`, `print`, `if`, `while`, `for`, `def`, `func`, `class`, etc.)
- Strings (single-quoted, double-quoted, f-strings)
- Numbers (integers, hex, floats)
- Booleans and nil
- Comments
- Operators (arithmetic, comparison, logical, bitwise, assignment)
- Brackets and delimiters
- Hardware primitives (`i2c.read`, `spi.write`, etc.)
- `py { ... }` and `rust { ... }` blocks

## License

MIT License
