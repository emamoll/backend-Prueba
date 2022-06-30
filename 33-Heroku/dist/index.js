"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const minimist_1 = __importDefault(require("minimist"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const server_1 = __importDefault(require("./services/server"));
const argumentos = (0, minimist_1.default)(process.argv.slice(2));
exports.PORT = process.env.PORT || 8080;
const clusterMode = argumentos.cluster;
//Obtengo el numero de nucleos disponibles en mi PC
const numCPUs = os_1.default.cpus().length;
/* --------------------------------------------------------------------------- */
/* MASTER */
/**
 * isMaster vs isPrimary
 * https://stackoverflow.com/questions/68978929/why-is-nodejs-cluster-module-not-working
 */
if (clusterMode && cluster_1.default.isMaster) {
    console.log('Ejecutando modo cluster');
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    server_1.default.listen(exports.PORT, () => console.log(`Servidor express escuchando en el puerto ${exports.PORT} - PID WORKER ${process.pid}`));
}
