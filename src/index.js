import express from "express"; // impotação da pacote express
const app=express(); // instanciando o express

import cors  from "cors";
app.use(cors())

app.use(express.json())

import {bd} from './infra/bd-sqlite.js'


import {usuario} from './controlles/controlles-usuario.js';
usuario(app, bd);

// import tarefas from './controlles/controlles-tarefas.js'
// tarefas(app);


app.listen(3000, ()=>{
    console.log("RODANDO NA PORTA 3000")
}) 
