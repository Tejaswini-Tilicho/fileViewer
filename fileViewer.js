const fs = require('fs');
const path = require('path')


class Constants {
    static CD = "cd";
    static JS = "js";
    static TXT = "txt";
    static EXE = "exe";
    static G = "-G";
    static A = "-a";
    static FI = "-fi";
    static DIR = "-dir";
    static FIG = "-fiG";
    static C = "c";
    static S = "s";
    static E = "e";
    static PWD = "pwd";
    static LS = "ls";
    static CAT = "cat";
    static FIND = "find";
    static HELP = "help";
    static HISTORY = "history";
  
  }
  Object.freeze(Constants);

class FileViewer {
  constructor() {
    
    this.currentDirectory = __dirname;
    this.tempDir = this.currentDirectory;
    this.helpCommando = {
      'cd': 'Prints -> `Users current directory`',
      'pwd': 'Prints -> `Users present working directory`',
      'ls': 'Prints -> `Users list of  directories and files`',
      'cat': 'Prints -> `Users list of lines mentioned of specified file`',
      'find': 'Prints -> Used to find particular file or Directory',
      'history': 'History of commands',
      'logs': 'Prints -> `Logs of all commands`'
    };
    this.directories = {'files' : [],
                        'folders' : [],
                        'filesNfolders' : [],
                        'textFiles' : []};
    this.fileExtensions = {};
  }

  check() {

    this.directories['files'] = [];
      this.directories['folders'] = [];
      this.directories['filesNfolders'] = [];
      try {
        const contents = fs.readdirSync(this.currentDirectory);
       //console.log(this.currentDirectory)
        // Iterate over the contents
        contents.forEach(item => {
            // Construct the full path of the item
            const itemPath = path.join(this.currentDirectory, item);
    
            // Check if the item is a directory or a file
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                //console.log('Directory:', item);
                this.directories['folders'].push(item)
                this.directories['filesNfolders'].push(item)
            } else if (stats.isFile()) {
                //console.log('File:', item);
                this.directories['files'].push(item)
                this.directories['filesNfolders'].push(item)
            }
        });
    } catch (error) {
        console.error('Error reading directory:', error);
    }
    
      
  //console.log(this.directories)
  //console.log(this.directoriesArray)
  //console.log(this.filesNfolders)
}

  cd(input) {
    
    if (input[1] === '..') {
      this.currentDirectory = path.dirname(this.currentDirectory);
      
      console.log(this.currentDirectory);
    }

    else if (input[1] === undefined) {
      console.log("Please specify directory");
    }

    else {

      let newPath = path.join(this.currentDirectory,input[1]);
      if(fs.existsSync(newPath)) {
        this.currentDirectory = newPath;
        console.log(this.currentDirectory);
      }
      else {
        console.log('Invalid directory')
      }
      //this.check();
      
    }
  }

  pwd() {
    
      console.log(this.currentDirectory);
  
  }

  ls (input) {
    this.check();
    //console.log(this.currentDirectory)
    //let files = [];
    this.fileExtensions = {};
    let filesArray = [...this.directories['files']];
    //console.log(filesArray);
    for (let i of filesArray) {
      //console.log(i)
      let ext = i.split(".");
      //console.log(ext)
      if(this.fileExtensions[ext[1]]) {
        this.fileExtensions[ext[1]].push(i);
      }
      else {
        this.fileExtensions[ext[1]] = [i];
      }
      //this.fileExtensions[ext[1]] ;
      
    }
    //console.log(this.fileExtensions)

  if(input[1] === undefined) {
    console.log('All Files and Directories:', this.directories['filesNfolders']);
  }
    else if (input[1] === Constants.G) {
    //console.log("Folders:\n");
    console.log('Directories:', this.directories['folders']);
    //console.log("Files:\n");
    console.log('Files:', this.directories['files']);
    }
    
    else if(input[1] === Constants.A) {
    let hiddenFiles = [];
    for (let i of this.directories['files']) {
    if(i[0] === '.') {
    hiddenFiles.push(i);
    }
    }
    console.log(hiddenFiles);
    }
    
    else if(input[1] === Constants.FI) {
      console.log('Files:', this.directories['files']);
    }
    
    else if (input[1] === Constants.DIR) {
      console.log('Directories:', this.directories['folders']);
    }
    
    else if (input[1] === Constants.FIG) {
        console.log(this.fileExtensions);
    }
    
    else {
    console.log("Invalid Command")
    }
  }

  cat2(input) {
    if(input[1] === undefined) {
      console.log("Please specify file path")
    }
    else if(!fs.existsSync(input[1])) {
      console.log('Invalid file path')
    }
    else {
     let relativePath = input[1];
     let absolutePath = path.resolve(relativePath);
     let check = absolutePath.split(".");
     if(!input[2]) {
      input[2] = 5;
     }
     if(fs.existsSync(absolutePath)) {
      let temp = check.pop();
      if(temp != 'txt') {
        console.log('.txt file extensions not found');
      }
      else {
        let fileContent = fs.readFileSync(absolutePath,'utf8');
        const lines = fileContent.split("\n").slice(0,Number(input[2]));
        console.log(lines.join("\n"));
      }
     }
    }
  }

    cat(input) {
      if(input[1] === undefined) {
        console.log("Please specify file")
        }

      else if(input[1].split(".")[1] === 'txt') {
        if(fs.existsSync(input[1])) {
          try {
            const data = fs.readFileSync(input[1], 'utf8');
            const fileData = data.split(/\r?\n/).map(name => name.trim());
          
          if(input[2] === undefined) {
          console.log(fileData.slice(0,5));
          }
          else {
          console.log(fileData.slice(0,input[2]));
          }
          }
          catch (err) {
            console.error(err);
          }
        }
      }
      else {
        console.log('File invalid')
        }

  }

  find(input) {
    //Implement code here
    //let ls = new LS();
    
    if (input[1] === undefined) {
        console.log('Please specify name to search');
    }

    else if (input[2] === undefined || input[2] === Constants.C && input[1]) {

        //console.log(this.filesNfolders)
        let files = fs.readdirSync(this.currentDirectory);
        console.log(files)
        let reqFiles = files.filter(item => item.includes(input[1]));
        console.log(reqFiles);
      
    }

    else if (input[2] === Constants.S && input[1]) {
      let files = fs.readdirSync(this.currentDirectory);
      console.log(files)
      let reqFiles = files.filter(file => file.startsWith(input[1]));
      console.log(reqFiles);

    }


    else if (input[2] === Constants.E && input[1]) {
      let files = fs.readdirSync(this.currentDirectory);
      let t = files.map(item =>item.split(".").shift())
     // console.log(t)
      let reqFiles = t.filter(file => file.endsWith(input[1]));
      console.log(reqFiles);
    }

    else {
        console.log('File not found')
    }

}

  help() {
    
      console.log(this.helpCommando)
  }
  
      
}

//const {Find} = require('./find.js');
//const { LS } = require('./ls.js')
const {Logger} = require('./logs.js')

class Execution {

  constructor() {
    this.historyCommands = [];
    this.fileViewer = new FileViewer();
    //this.ls = new LS();
    //this.find = new Find();
    this.logger = new Logger();
    this.historyCom = [];

  }
  executeCommands(input) {
    
    let commands = ['cd', 'pwd', 'ls', 'cat', 'find' ,'history']
    this.historyCommands.push(input);
    this.historyCom.push(input.join(' '));

    if (this.logger.loggingEnabled) {
      this.logger.logCommands.push(input);
      this.logger.logCommand(input)
  }
  
    if (commands.includes(input[0]) && input[1] === '--help') {
      console.log(this.fileViewer.helpCommando[input[0]]);
    }
    else if(input[0] === 'log') {
      this.logger.executeLogs(input);
    }
    else {
      switch (input[0]) {
        case 'cd':
          return this.fileViewer.cd(input);
        case 'pwd':
          return this.fileViewer.pwd();
        case 'ls':
          return this.fileViewer.ls(input);
        case 'cat':
          return this.fileViewer.cat(input);
        case 'find':
          return this.fileViewer.find(input);
        case 'help':
          return this.fileViewer.help();
        case 'history':
          return this.history();
        case 'cat1' :
          return this.fileViewer.cat2(input);
        default:
          console.log("Invalid Input")
        
      }
    }
    
  }
  history() {
    console.log(this.historyCom);
  }
  

}

const prompt = require('prompt-sync')();
const exe = new Execution();
while (true) {
  let commandLine = prompt("Enter Command:");
  let input = commandLine.split(" ");
  if (input == 'exit') {
    return;
  }
  exe.executeCommands(input);
}
