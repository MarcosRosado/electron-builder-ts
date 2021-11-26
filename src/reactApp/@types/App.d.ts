
export interface IElectronAPI {
    test: (args) => Promise<string>,
    getSettings: (args) => Promise<Record<string, unknown>>,
    getProjects: () => Promise<Record<string, unknown>>,
    setSettings: (args)=> Record<string, unknown>,
}
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}