'use strict';
/**
 * @api             bargs
 * @api:npm         @archivistnerd/bargs
 * @api:git         https://github.com/Archivist-Nerd/node-bargs
 * @api:Licence     MIT
 * @api:Copyright   Copyright (c) 2020 Archivist-Nerd
 *
 *
 * @api:Example:
 *      const bargs = require('@archivistnerd/bargs');
 *
 *      bargs.help()
 */
const args = require('@archivistnerd/args')
    , spaces = '                                                                  '
    ;
let bargs = {
      details: {
        name:   args.argv.$0,
        usage:  '',
        commands: [],
        options: [
          ['help','show help']
        ],
      }
    }
  , commandsRan=0
  , minCmd=10
  , minOpt=10
  ;
/**
 * @api:name    scriptName  Sets the script name displayed in help
 * @api:group   functions
 *
 * @api:Param {String} Name of application.
 *
 * @api:Example:
 *      bargs.scriptName( 'Example' );
 */
bargs.scriptName = ( _name )=>{
  bargs.details.name = ( typeof _name != undefined )? _name:bargs.details.name
  return bargs
}
/**
 * @api:name    usage       defines a usage description displayed in help
 * @api:group   functions
 *
 * @api:Param {String} Application usage description.
 *
 * @api:Example:
 *      bargs.usage( '%NAME% <cmd> [...args]')
 */
bargs.usage = ( _usage )=>{
  bargs.details.usage = ( typeof _name != undefined )? _usage:bargs.details.usage
  return bargs
}
/**
 * @api:name    argv        Returns any remaining arguments stored in .argv
 * @api:group   variable
 *
 * @api:Example:
 *      bargs.argv;
 */
bargs.argv = args.argv
/**
 * @api:name    args        sets .argv using supplied argument string
 * @api:group   function
 *
 * @api:Param    {String}   supplied argument string
 *
 * @api:Example:
 *      bargs.args('test1 --port 80');
 */
bargs.args = ( _args='' )=>{
  bargs.argv = args.process( _args )
  // reset internal variables
  commandsRan = 0
  minCmd = 10
  minOpt = 10
  bargs.details.commands = []
  bargs.details.options  = [ ['help','show help'] ]
  return bargs
}
/**
 * @api:name    command  test for a valid command to run
 * @api:group   function
 *
 * @api:Param    {String}   should be a string representing the command
 * @api:Param    {String}   provide a description for each command your application accepts
 * @api:Param    {Function} function, which will be executed with the parsed argv object
 * @api:Optional {Array}    object to give hints about the options that your command accepts
 *
 * @api:Example:
 *      bargs.command('serve [port] [host] [path] [cache-file]', 'Serve Local Path', 
 *              (argv) => console.log( 'server:\t',argv.port, argv.host, argv.path, argv.cacheFile )
 *             ,[
 *                { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
 *                { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
 *                { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
 *                { name: 'cacheFile', type: 'string', default: '',          describe: 'cache filename' },
 *            ])
 *
 * @api:Example:
 *      bargs.command('$ [build file]', 'build file location', 
 *              (argv) => console.log( 'default command:\t',argv.buildFile )
 *             ,[
 *                { name: 'buildFile', type: 'string', describe: 'cache filename' },
 *            ])
 */
bargs.command = ( cmd,desc,handler=()=>{},builder=[] )=>{
  let _options = cmd.trim().split(' ')
    , _cmd     = _options.shift()
    ;
  if (cmd=='') return bargs
  // store details for help (if not $)
  if ( _cmd !== '$' ) bargs.details.commands.push([_cmd,_options,desc])
  if ( _cmd.length>minCmd ) minCmd=_cmd.length+1
  // test if command should be blank
  if ( _cmd !== '$' ){
    if ( bargs.argv._.length == 0 ) return bargs
    if ( bargs.argv._[0] != _cmd) return bargs
    // run command
    bargs.argv._.shift()             // remove command
  }
  // process builder options
  if (Array.isArray(builder)) builder.forEach( option=>{
    let _type = (option.type)? option.type:'string'
      , value = (option.default)? option.default:undefined
      ;
    // skip option if already defined
    if (typeof bargs.argv[option.name] != 'undefined') return false
    // test argument
    if ( bargs.argv._.length>0) value = (_type.toLowerCase()=='number')? parseFloat(bargs.argv._.shift()):bargs.argv._.shift()
    // set option value
    bargs.argv[ option.name ] = value
  })
  if (typeof handler == 'function') handler( bargs.argv )

  commandsRan++

  return bargs
}
/**
 * @api:name    option  test if --{option} is not !false or undefined
 * @api:group   function
 *
 * @api:Param    {String}   should be a string representing the option name
 * @api:Param    {String}   provide a description for this option your application accepts
 * @api:Param    {Function} function, which will be executed with the parsed argv object
 *
 * @api:Example:
 *      bargs.option('test', 'a simple test', 
 *              (argv) => console.log( 'option "test" confirmed!' )
 *            )
 */
bargs.option = ( option,desc,handler=()=>{} )=>{
  let val     = bargs.argv[ option.trim().split(' ') ]
    ;
  if (option=='') return bargs
  // store details for help
  bargs.details.options.push([ option,desc ])
  if ( option.length>minOpt ) minOpt=option.length+1

  if ( val == false || val == undefined) return bargs
  if (typeof handler == 'function') handler( bargs.argv )

  commandsRan++

  return bargs
}
/**
 * @api:name    displayHelp  always displays the help message
 * @api:group   functions
 *
 * @api:Example:
 *      bargs.displayHelp();
 */
bargs.displayHelp = ( commands='', options='') => {
  // process commands
  let usage    = bargs.details.usage.replace('%NAME%', bargs.details.name )
    ;
  console.log('---',bargs.details.commands)
  bargs.details.commands.forEach( cmd =>{
    commands += `  ${cmd[0]}${spaces.substr(0,minCmd-cmd[0].length)} ${cmd[1].join(' ')}\t${cmd[2]}\n`
  })
  bargs.details.options.forEach( cmd =>{
    options += `  --${cmd[0]}${spaces.substr(0,minOpt-cmd[0].length)} ${cmd[1]}\n`
  })
  // display help
  console.log(`${bargs.details.name}\n\n${usage}\n\n${(commands)? 'Commands:\n'+commands:''}\n${ (options)? 'Options:\n'+options:''}`)
  return bargs
}
/**
 * @api:name    help  
 * @api:group   functions
 *
 * @api:Optional {Binary}   Displays help information if (true or no commands ran)
 *
 * @api:Example:
 *      bargs.scriptName( 'Example' );
 */
bargs.help = ( show=false ) =>{
  if ( !show && (commandsRan>0) ) return bargs

  return bargs.displayHelp()
}
/**
 *     export bargs variable
 */
module.exports = bargs;