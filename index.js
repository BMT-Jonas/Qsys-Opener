#!/usr/bin/env node
const fs = require('fs');
const { spawn } = require('child_process');
const filePath = process.argv[2];
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rgx = new RegExp(/\d\.\d\.\d\.\d/g)
  const found = data.match(rgx);
  const myversion = found[0].substring(0,3);
  if (!fs.existsSync('C:/Program Files/QSC/Q-SYS Designer '+myversion)) {
    console.log("This version of QSYS Designer is not installed: "+myversion)
    return
  }
  console.log('C:/Program Files/QSC/Q-SYS Designer '+myversion+'/Q-Sys Designer.exe');
  // //spawn(cmd, 'start "Q-SYS Launcher" /D "C:/Program Files/QSC/Q-SYS Designer 9.6" "Q-Sys Designer.exe" '+found[0])
  var child = spawn('C:/Program Files/QSC/Q-SYS Designer '+myversion+'/Q-Sys Designer.exe', ['/c', filePath], { detached: true, stdio: [ 'ignore', 'ignore', 'ignore' ] });
  child.unref();
  handle.disconnect(); 
  readline.question('', () => {
    readline.close();
  });
});