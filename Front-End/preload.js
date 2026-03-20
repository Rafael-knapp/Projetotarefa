const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('env', {
  API_URL: 'http://localhost:3000'
});
