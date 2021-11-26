import {ipcRenderer} from "electron";
const ADODB = require("node-adodb");
const fs = require("fs")
const DbConnect = {

    getConnection(path){
        return ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${path}`);
    },

    getDefaultPath(){
        const programFiles = process.env["ProgramFiles(x86)"];
        return programFiles+"\\Mata Nativa 4"
    },

    checkDefaultPath(){
        return fs.existsSync(this.getDefaultPath());
    },

    async getProjects(){

        return new Promise(async function (resolve, reject) {
            // sets the adodb resource folder when in production build
            let isDev = await ipcRenderer.invoke("is-dev");
            if(!isDev){
                ADODB.PATH = './resources/adodb.js';
            }

            let path = null;
            let response = await ipcRenderer.invoke("get-settings", "MNPath");
            let connection = null;
            // verifica se o path do software está definido no arquivo de configurações
            if(response === undefined){
                //caso não esteja definido verifica se o software está instalado no diretório padrão
                if (DbConnect.checkDefaultPath()) {
                    path = DbConnect.getDefaultPath();
                    // se estiver define o path nas configurações como sendo o do diretório padrão
                    await ipcRenderer.invoke("set-settings",{key: "MNPath", object: {path: path}});
                    // conecta ao banco de dados na pasta do Mata Nativa 4
                    connection = DbConnect.getConnection(path+"\\Dados\\MataNativa.mdb");
                    connection.query("SELECT * FROM Projeto")
                        .then(response => resolve(JSON.stringify(response, null, 2)))
                        .catch(err => reject(JSON.stringify(err)));

                }
                // return false para informar que o path é inválido
                else reject(false);
            }
            // caso o path já esteja definido no arquivo de configurações busca a partir dele
            else{
                path = response.path;
                // verifica se o arquivo MDB está nesse path salvo pelo usuário
                if(fs.existsSync(path+"\\Dados\\MataNativa.mdb")) {
                    // se o path for válido recupera as informações dos projetos
                    connection = DbConnect.getConnection(path+"\\Dados\\MataNativa.mdb");
                    connection.query("SELECT * FROM Projeto")
                        .then(response => resolve(JSON.stringify(response, null, 2)))
                        .catch(err => {reject(JSON.stringify(err))});
                }
                else{
                    // caso contrário return false
                     reject(false);
                }
            }
        })
    }
}

DbConnect.getProjects();

export default DbConnect