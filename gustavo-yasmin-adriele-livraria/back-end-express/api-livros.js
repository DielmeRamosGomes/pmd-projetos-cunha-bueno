// npm install mysql2
// npm install express
// npm install cors

import express from 'express';
//import Produto from './Produto.js';
import Conexao from './Conexao.js';
import cors from 'cors';
import Usuario from './Usuarios.js';

const app = express();
//const cors = cors();

// use middleware cors
app.use(cors(
  {
    origin: 'http://127.0.0.1:5500'
  })
);

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

let lista_livros = [];
let lista_usuarios = [];

async function usarConexao() {
  const conexao = new Conexao('localhost', 3306, 'root', '', 'livraria_web');
  const pool = await conexao.conectar();
  const connection = await pool.getConnection();
  return connection;
}

app.get('/listarusuarios', (req, res) => {
  //res.json(lista_produtos);
  usarConexao()
    .then(connection => {
      return connection.query('SELECT * FROM livraria_web.usuarios');
    })
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(error => {
      console.error('Erro ao listar usuarios:', error);
      res.status(500).json({ error: 'Erro ao listar usuarios' });
    });
});

app.post('/cadastrarusuario', async (req, res) => {
  let { nome, senha, email } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  let novoUsuario = new Usuario(nome, email, senha);
  lista_usuarios.push(novoUsuario);

  try {
    const connection = await usarConexao();
    const [rows] = await connection.query('CALL livraria_web.CADASTRO_USUARIO(?, ?, ?);',
      [nome, senha, email]
    );
    console.log(rows);
    connection.release();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir o usuário no banco de dados' });
  }
});

app.get('/listarlivros', (req, res) => {
  usarConexao()
    .then(connection => {
      return connection.query('SELECT * FROM livraria_web.livros');
    })
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(error => {
      console.error('Erro ao listar livros:', error);
      res.status(500).json({ error: 'Erro ao listar livros' });
    });
});

app.post('/listaidusuario', (req, res) => {
  let { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }
  usarConexao()
    .then(connection => {
      return connection.query('call livraria_web.pegar_usuario_id(?, ?);',
        [email, senha]
      );
    })
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(error => {
      console.error('Erro ao listar id:', error);
      res.status(500).json({ error: 'Erro ao listar id' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}/`);
});