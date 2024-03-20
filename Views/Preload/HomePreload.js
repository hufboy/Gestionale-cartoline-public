const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron

})

contextBridge.exposeInMainWorld('Data', {
  GetCartoline: async () => await ipcRenderer.invoke('GetAllCartoline', undefined).then((res) => {

    return res;
  }),
  InsertCartoline: async (newobj) => await ipcRenderer.invoke('InsertCartoline', newobj).then((res) => { 
    return res;
  }),
  UpdateCartoline: async (obj) => await ipcRenderer.invoke('UpdateCartoline', obj).then((res) => {
    return res;
  }),
  ViewSearch: async () => await ipcRenderer.invoke('View', 'Search').then((res) => {
    return res;
  }),
  ViewLogs: async () => await ipcRenderer.invoke('View', 'Logs').then((res) => {
    return res;
  }),
  SetFilter: (callback) => ipcRenderer.on('SetFilter', callback),

})

contextBridge.exposeInMainWorld('LogsApi', {
  GetLogs: async () => await ipcRenderer.invoke('GetLogs',undefined).then((res) => {
    return res;
  }),
})

contextBridge.exposeInMainWorld('DatabaseSync', {
  Sync: async () => await ipcRenderer.invoke('SyncDatabase', undefined).then((res) => {
    return res;
  })
})