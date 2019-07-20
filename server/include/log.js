require('../config/config');
const log4js = require('log4js');
const path = require('path')

let configure = (className)=>log4js.configure({
    appenders: {
        'out': {
            type: 'stdout',
            layout: {
                type: 'coloured'
            }
        },
        'logFile': {
            type: 'file',
            filename: path.resolve(__dirname,`../logs/${className}.log`),
            maxLogSize: 10485760,
            backups: 3,
            compress: true
        }
    },
    categories: {
        default: {
            appenders: [process.env.LOG_APPENDER||'logFile'],
            level: process.env.LOG_LEVEL||'DEBUG'
        }
    }
});
let initLogger = (className) =>{
    name = path.parse(className).name||className;
    configure(name);
    let log =  log4js.getLogger(name);
    log.debug('Log initialized');
    return log;
}

module.exports = {initLogger};