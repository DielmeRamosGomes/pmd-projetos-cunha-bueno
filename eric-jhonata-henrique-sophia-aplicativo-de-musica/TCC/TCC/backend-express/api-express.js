// npm install mysql2
// npm install express
// npm install cors
 
import express from 'express';
import Conexao from './Conexao.js';
import cors from 'cors';
import Usuario from './Usuarios.js';
import Produto from './Produtos.js';
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
 
let lista_produtos = [];
let lista_usuarios = [];
 
async function usarConexao() {
  const conexao = new Conexao('localhost', 3306, 'root', '', 'mydatabase');
  const pool = await conexao.conectar();
  const connection = await pool.getConnection();
  return connection;
}
 
app.get('/listarusuarios', (req, res) => {
  //res.json(lista_produtos);
  usarConexao()
    .then(connection => {
      return connection.query('SELECT * FROM mydatabase.usuarios');
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
  let {nome, email, senha} = req.body;
 
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }
 
  let novoUsuario = new Usuario(nome, email, senha);
 
  lista_usuarios.push(novoUsuario);
 
  try {
    const connection = await usarConexao();
    const [rows] = await connection.query('INSERT INTO mydatabase.usuarios(name, email, senha) VALUES (?, ?, ?);',
      [nome, email, senha]
    );
    console.log(rows);
    connection.release();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir o usuário no banco de dados' });
  }
});
 
app.get('/listarprodutos', (req, res) => {
  //res.json(lista_produtos);
  usarConexao()
    .then(connection => {
      return connection.query('SELECT * FROM mydatabase.produtos');
    })
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(error => {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ error: 'Erro ao listar produtos' });
    });
});
 
app.post('/listaidusuario', (req, res) => {
  let { email, senha} = req.body;
if ( !email|| !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }
  usarConexao()
    .then(connection => {
      return connection.query('call mydatabase.pegar_usuario_id(?, ?);',
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

app.post('/cadastrarproduto', async (req, res) => {
  let { nome, preco, descricao, urlimagem } = req.body;
 
  if ( !nome || !preco || !descricao || !urlimagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }
 
  let novoProduto = new Produto( nome, preco, descricao, urlimagem);
 
  lista_produtos.push(novoProduto);
  console.log(`nome ${novoProduto.getNome()}`);
  try {
    const connection = await usarConexao();
    const [rows] = await connection.query('INSERT INTO mydatabase.produtos(nome, preco, descricao, urlimagem) VALUES ( ?, ?, ?, ?);',
      [ nome, preco, descricao, urlimagem]
    );
    console.log(rows);
    connection.release();
    res.status(201).json({ message: 'Produto cadastrado com sucesso!', produto: novoProduto });
  } catch (error) {
    console.error('Erro ao inserir produto:', error);
    res.status(500).json({ error: 'Erro ao inserir o produto no banco de dados' });
  }
});
 
const lista_todos_produtos = () => {
  for (let i = 0; i < lista_produtos.length; i++) {
    lista_produtos[i].exibirProduto();
    console.log('-----------------------------------------------------');
  }
}
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}/listarprodutos`);
});