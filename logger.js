const fs = require('node:fs');
const fsAsync = require('node:fs/promises');
const Path = require('node:path');
const Lux = require('luxon');
const readline = require('readline'); 

let logfile = undefined;
let ReaderHandler = undefined;
async function LogFile(){
    try{
        let ff = await fsAsync.open(
            Path.join(__dirname, '/logs.txt'),
            'a+'
        );

        logfile = await ff.createWriteStream();
        ReaderHandler = await ff.createReadStream();

        
    }catch(err){
        console.error(err);
    }
}

async function LogInfo(content){
    const dt = Lux.DateTime.now().setZone('default').toISO();
    const ll = `[INFO] [${dt}] => ${content} \r\n`;
    await logfile.write(ll);
}

async function LogError(content){
    const dt = Lux.DateTime.now().setZone('default').toISO();
    const ll = `[ERROR] [${dt}] => ${content} \r\n`;
    await logfile.write(ll);
}

async function Logjet(){
    return new Promise((resolve, reject) => {
        let LogsLines = [];
        try{   
            const file = readline.createInterface({ 
                input: fs.createReadStream(Path.join(__dirname, '/logs.txt')), 
                output: process.stdout, 
                terminal: false
            }); 
    
            file.on('line', (line) => {
                LogsLines.push(line);
            });
    
            file.on('close', () => { 
                
                resolve( LogsLines.reverse());
            });
            
            // return LogsLines.reverse();
        }catch(err){
            LogError(err);
            reject(LogsLines)
        }
    });

    
}

module.exports = {
    LogFile,
    LogInfo,
    LogError,
    Logjet
};