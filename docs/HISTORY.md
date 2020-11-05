# node-bargs
Archivist Nerd's Simple tool for command line interfaces



## History
|  Date     | Version  |    type   | Description     |
|-----------|----------|-----------|-----------------|
| 201105.02 |**v0.1.4**| **fixed** | .displayHelp |
|           |          |           |    would error if app had no commands |
| 201105.00 |**v0.1.3**| **modified** | .command |
|           |          |              |    command name $ for default command without a name (only 1 per app) |
|           |          | **added** | .option |
|           |          |           |    runs provided call back function if option is not "undefined" or "false" |
|           |          |           | .displayHelp |
|           |          |           |    always displays the help information |

| 201101.05 |**v0.1.0**| **added** | .scriptName( String ) |
|           |          |           | .usage( String ) |
|           |          |           | .args( String ) |
|           |          |           | .command( cmd,desc,handler,builder ) |
|           |          |           | .help( Boolean ) |
| 201101.07 |**v0.1.2**| **modified** | .help |
| 201101.06 |**v0.1.1**| **removed**  | *.tgz files in package |
| 201029.18 |**v0.0.0**| **start**    | project started |
