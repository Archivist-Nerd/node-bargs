'use strict';
/**
 * @test:name        @archivistnerd/bargs/test
 * @test:package     bargs
 * @test:licence     MIT
 * @test:copyright   Copyright (c) 2020 Archivist-Nerd
 */
require('@archivistnerd/testlib')
        /**
         * @test:attempt      .scriptName( _name )
         */
        .add(
          '.scriptName = ( _name )',
          ()       => {
                        let bargs = require('../.');
                        return bargs.scriptName( 'testName' )
                      },
          (result) => (result.details.name == 'testName')
        )
        /**
         * @test:attempt      .usage( '%NAME% <cmd> [...args]' )
         */
        .add(
          `.usage( '%NAME% <cmd> [...args]' )`,
          ()       => {
                        let bargs = require('../.');
                        return bargs.usage( '%NAME% <cmd> [...args]' )
                      },
          (result) => (result.details.usage == '%NAME% <cmd> [...args]')
        )
        /**
         * @test:attempt      bargs.args( 'serve --port 89' )
         */
        .add(
          `.args( String )`,
          ()       => {
                        let bargs = require('../.');
                        return bargs.args( 'serve --port 89' )
                      },
          (result) => (result.argv._[0] == 'serve')
        )
        /**
         * @test:attempt      .command('serve [port] [host] [path] [cache-file]', 'Serve Local Path') )
         */
        .add(
          `.command`,
          ()       => {
                        let bargs = require('../.')
                          , result = false
                          ;
                        bargs.args('serve')
                        bargs.command('serve [port] [host]', 'Serve Local Path',
                                ()=>{ result=true }
                              )
                        return result
                      }
        )
        /**
         * @test:attempt      .option
         */
        .add(
          `.option`,
          ()       => {
                        let bargs = require('../.')
                          , result = false
                          ;
                        bargs.args('hehe --burp')
                        bargs.option('hehe', 'this should not be ran',
                                ()=>{ result=false }
                              )
                        bargs.option('burp', 'it worked :)',
                                ()=>{ result=true }
                              )
                        return result
                      }
        )
        /**
         * @test:attempt      .command('serve [port] [host] [path] [cache-file]', 'Serve Local Path') )
         */
        .add(
          `.command -- with options`,
          ()       => {
                        let bargs = require('../.')
                          , result = false
                          ;
                        bargs.args('serve 80')
                        bargs.command('serve [port] [host]', 'Serve Local Path',
                                (args)=>{ 
                                      result=true
                                    }
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        return result
                      }
        )
        /**
         * @test:attempt      multiple commands )
         */
        .add(
          `.command -- multiple commands`,
          ()       => {
                        let bargs = require('../.')
                          , result = false
                          ;
                        bargs.args('serve2 80')
                        bargs.command('serve [port] [host]', 'Serve Local Path',
                                (args)=>{ 
                                      result=false
                                    }
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        bargs.command('serve2 [port] [host]', 'Serve Local Path',
                                (args)=>{ 
                                      result=true
                                    }
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        return result
                      }
        )
        /**
         * @test:attempt      default command )
         */
        .add(
          `.command -- default commands`,
          ()       => {
                        let bargs = require('../.')
                          , result = false
                          ;
                        bargs.args('serve2 80')
                        bargs.command('serve [port] [host]', 'Serve Local Path',
                                (args)=>{ 
                                      result=false
                                    }
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        bargs.command('serve2 [port] [host]', 'Serve Local Path',
                                (args)=>{ 
                                      result=false
                                    }
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        bargs.command('$ [argument]', 'default command',
                                (args)=>{ 
                                      result=true
                                    }
                              , [
                                  { name: 'argument', type: 'string', describe: 'argument' },
                                ]
                              )
                        return result
                      }
        )
        /**
         * @test:attempt      help )
         */
        .add(
          `.help`,
          ()       => {
                        let bargs = require('../.')
                          ;
                        bargs.args('')
                        bargs.command('serve [port] [host]', 'Serve Local Path',
                                (args)=>{}
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        bargs.command('serve2 [port] [host]', 'Serve Local Path',
                                (args)=>{}
                              , [
                                  { name: 'port',      type: 'number', default: '8080',      describe: 'Port to listen on' },
                                  { name: 'host',      type: 'string', default: '127.0.0.1', describe: 'Host Address' },
                                  { name: 'path',      type: 'string', default: './',        describe: 'Local Path to serve' },
                                  { name: 'cacheFile', type: 'string',                       describe: 'cache filename' },
                                ]
                              )
                        bargs.help()
                        return true
                      }
        )
        /**
         * execute all tests
         */
        .exec();