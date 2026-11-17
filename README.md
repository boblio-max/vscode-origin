# Origin Language VS Code Extension

Syntax highlighting and language support for the Origin programming language.

## Features

- **Syntax highlighting** for `.or` files using a TextMate grammar
- **Language configuration** with comments, brackets, and indentation rules
- **File association** for `.or` extension

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
code --install-require-checks origin-language-0.1.0.vsix
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
