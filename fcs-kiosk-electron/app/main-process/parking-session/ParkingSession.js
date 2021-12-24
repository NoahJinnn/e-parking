const { ipcMain } = require('electron')

const { db } = require('../../db')
const { v4: uuid } = require('uuid')

// TODO: Create DB repository layer
ipcMain.handle('read-parking-session', async (event, arg) => {
  return 'foo'
})

ipcMain.handle('create-parking-session', async (event, arg) => {
  const { checkinSession } = arg
  const insertedPS = await db('ParkingSession').insert(checkinSession)
  return insertedPS
})

ipcMain.handle('update-parking-session', async (event, arg) => {
  return 'foo'
})

ipcMain.handle('delete-parking-session', async (event, arg) => {
  return 'foo'
})
