// Let Windows drain Vite's closing async handles before the CLI's success exit.
// Failure exits keep their original code and behavior.
if (process.platform === 'win32') {
  const exit = process.exit.bind(process);
  process.exit = (code) => {
    if (code === 0) setTimeout(() => exit(0), 700);
    else exit(code);
  };
}
process.argv = [process.execPath, 'vinext', 'build'];
await import('../node_modules/vinext/dist/cli.js');
