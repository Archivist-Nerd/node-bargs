# node-bargs
[![npm version](https://img.shields.io/npm/v/@archivistnerd/bargs.svg)](https://www.npmjs.com/package/@archivistnerd/bargs)

Archivist Nerd's bargs: Simple tool for command line interfaces

> helps you build interactive command line tools by parsing arguments and generating an elegant user interface. (like a less useful version of yargs)

## Reason for bargs instead of the bettter [yargs](https://www.npmjs.com/package/yargs)?

> bargs is smaller, less files, for simple command line tools
> yargs is WAYYY more powerful, more options, more cool :) yargs even has an awesome icon.

## Installation

```sh
npm install -g @archivistnerd/bargs
```

## Example

```javascript
let bargs = require('@archivistnerd/bargs')
  ;
bargs
      .command('serve [port] [host]', 'Serve Local Path',
              (args)=>{}
            , [
                { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
              ]
            )

      .command('validate', 'validate local path', (args)=>{
        // this command has no arguments
      })
      // display help if no commands are executed
      .help()
      ;
```

## License

MIT
