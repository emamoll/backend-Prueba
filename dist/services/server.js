"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const utils_1 = require("../utils");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    console.log('Resolving / endpoint');
    res.json({
        pid: process.pid,
        msg: `HOLA desde puerto ${__1.PORT} y process id ${process.pid}`,
    });
});
app.get('/prime', (req, res) => {
    const primes = [];
    const max = Number(req.query.max) || 1000;
    for (let i = 1; i <= max; i++) {
        if ((0, utils_1.isPrime)(i))
            primes.push(i);
    }
    res.json(primes);
});
app.get('/saludar', (req, res) => {
    const primes = [];
    const max = Number(req.query.max) || 1000;
    for (let i = 1; i <= max; i++) {
        if ((0, utils_1.isPrime)(i))
            primes.push(i);
    }
    res.json({
        pid: process.pid,
        msg: `HOLA desde puerto ${__1.PORT} y process id ${process.pid}`,
        variable: process.env.ENV_EJEMPLO,
    });
});
app.get('/despedir', (req, res) => {
    res.json({
        pid: process.pid,
        msg: `CHAU desde puerto ${__1.PORT} y process id ${process.pid}`,
        variable: process.env.ENV_EJEMPLO,
    });
});
exports.default = app;
