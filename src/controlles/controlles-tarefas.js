export const tarefas = (app)=>{
    
    app.get('/tarefas', (req, res) =>{
        res.send({'meu banco tarefas:': bd.tarefas})
    })
    app.post('/tarefas', (req, res) =>{  
        res.send({"tarefas":req.body})   
    })
}

