// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
//使用node的api 
//alert(process.versions.node);

//使用dom的api
window.addEventListener('DOMContentLoaded', ()=>{
    //alert('welcome to visit dom api');
    ipcRenderer.send('message','say hello from renderer');
    ipcRenderer.on('reply',(event,arg)=>{
        document.getElementById('message').innerHTML = arg;
    });
});