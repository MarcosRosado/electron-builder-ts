import DBConnect from "./databaseOperations/databaseConnection";
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    test: (args) =>
        ipcRenderer.invoke("test-api", args).then((result) => {
            return result;
        }),
    getProjects: () => {
        return DBConnect.getProjectsMDBReader();
    },
    getSettings: (args) =>
        ipcRenderer.invoke("get-settings", args).then((result) => {
            return result;
        }),
    setSettings: (args)=>{
        ipcRenderer.invoke("set-settings", args).then((result) => {
            return result;
        })
    },


});
