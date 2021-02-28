#!/usr/bin/env node

let fs = require('fs');

( function(){

    let cmd = process.argv.slice(2);
    let options = [];
    let files = [];
    let str = ``;
    
    for(let i = 0 ; i < cmd.length ; i++){
        if(cmd[i].startsWith('-'))
        options.push(cmd[i]);
        else
        files.push(cmd[i]);
    }
    
    
    for(let j = 0 ; j < files.length ; j++){
            if(fs.existsSync(files[j])){
                str += fs.readFileSync(files[j]).toString();
              }
            else{
                console.log("invalid file");
                return;
            }
    }

 // function to implement -s
    function removeLargeSpaces(arr){
        let y = [];
        let f = 0;
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i] !== ""){
                y.push(arr[i]);
                f = 0;
            }
           
            if(arr[i] === "" && f == 0)
            {
                y.push("");
                f = 1;
            }
        }
        return y;
    }

// function to implement -n
    function addAllNum(arr){
        for(let i = 1; i <= arr.length; i++){
            arr[i-1] = i + "  " + arr[i-1];
        }
        return arr;
    }

// function to implement -b    
    function addNonEmptyNum(arr){
        let lineNumber = 1;
        for(let i = 0;i < arr.length; i++){
            if(arr[i] !== ""){
                arr[i] = lineNumber + "  " + arr[i];
                ++lineNumber;
            }
        }
            return arr;
    }
    
    if(options.includes("-s")){   
      str = removeLargeSpaces(str.split('\n')).join('\n');
    }
   
    if(options.includes("-n") && options.includes("-b")){

          if(options.indexOf("-n") > options.indexOf("-b")){
              str = addNonEmptyNum(str.split('\n')).join("\n");
          } else{
             str = addAllNum(str.split('\n')).join("\n");
          }
    }
    else{
        if(options.includes("-n")){
            str = addAllNum(str.split('\n')).join("\n");
        }
        if(options.includes("-b")){
            str = addNonEmptyNum(str.split('\n')).join("\n");
        }
    }

    console.log(str);
   
})();


