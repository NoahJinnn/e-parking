const { ipcRenderer, contextBridge } = require('electron')

// * Adds an object 'electronApi' which holds the invokers to the global window object at frontend
// * => use window.electronApi.<invoker> to invoke backend service
contextBridge.exposeInMainWorld('electronApi', {
  invokeFindParkingSession: async (arg) => {
    console.log('Read PS', arg)
    return await ipcRenderer.invoke('read-parking-session', arg)
  },
  invokeInsertParkingSession: async (arg) => {
    console.log('Create PS', arg)
    return await ipcRenderer.invoke('create-parking-session', arg)
  },
  invokeUpdateParkingSession: async (arg) => {
    console.log('Update PS', arg)
    return await ipcRenderer.invoke('update-parking-session', arg)
  },
  invokeDeleteParkingSession: async (arg) => {
    console.log('Delete PS', arg)
    return await ipcRenderer.invoke('delete-parking-session', arg)
  },
})
