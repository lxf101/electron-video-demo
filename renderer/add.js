const {ipcRenderer} = require('electron');

document.getElementById('select-music').addEventListener('click',()=>{
    ipcRenderer.send('select-music');
});