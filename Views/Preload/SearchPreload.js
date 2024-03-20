const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('Data',{
    SetFilter: async (arg) =>  await ipcRenderer.invoke('Filter', arg).then((res) =>{      
      return res;
    }),
    
    
  })