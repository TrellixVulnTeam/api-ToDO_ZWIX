import { Usuario } from "../model/usuario-model.js";
import { UsuarioDao } from "../DAO/usuario-DAO.js";


const usuario = (app, bdSQLite) => {
   // instanciando o objeto de acesso aos dados
   const DadosDAO = new UsuarioDao(bdSQLite)


   app.get('/usuario', (req, res) => {
      DadosDAO.listarUsuario()
         .then((resultado) => {
            res.json(resultado)
         })
         .catch((err) => { res.send(err) })
   })

   app.post('/usuario', (req, res) => {
      const body = req.body;
      const NovoUsuario = new Usuario(body.nome, body.email, body.senha)
      DadosDAO.insereUsuario(NovoUsuario)
         .then((result) => {
            res.send("inserido com sucesso");
         }).catch((err) => {
            res.send(err);
         })
   })

   app.get('/usuario/:id', (req, res) => {
      const id = req.params.id;
      DadosDAO.listarUsuariosID(id)
         .then((result) => {
            res.send(result);
         }).catch((err) => {
            res.send(err);
         })

   })

   app.put('/usuario/:id', (req, res) => {

      const body = req.body
      console.log(body)
      const id = req.params.id;

      DadosDAO.listarUsuariosID(id)
         .then((usuarios) => {

            const DadoNovoUsuario = new Usuario(
               body.nome || usuarios[0].NOME,
               body.email || usuarios[0].EMAIL,
               body.senha || usuarios[0].SENHA
            )

            const parametro =
               [DadoNovoUsuario.nome,
               DadoNovoUsuario.email,
               DadoNovoUsuario.senha, id];
            const UsuarioAtual = DadosDAO.alterarUsuario(parametro)
               .then((result) => {
                  res.send(UsuarioAtual)
               })
               .catch((error) => {
                  res.send(err);
               })
         })
         .catch((erro) => {
            console.log(erro)
         })
   })

   app.delete('/usuario/:id', (req, res) => {
      DadosDAO.deletaUsuario(req.params.id)
         .then((resultado) => {
            res.send(`Usuário deletado com sucesso`);
         }).catch((err) => {
            res.send(err);
         })

   })
}


export { usuario }; //exp