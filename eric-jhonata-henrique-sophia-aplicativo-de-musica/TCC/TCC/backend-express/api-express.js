// npm install mysql2
// npm install express
// npm install cors
 
import express from 'express';
import Conexao from './Conexao.js';
import cors from 'cors';
import Usuario from './Usuario.js';
 
const app = express();
//const cors = cors();
 
// use middleware cors
app.use(cors(
  {
    origin: 'http://127.0.0.1:5500/'
  })
);
 
// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());
 
//let lista_produtos = [];
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
  let { id, nome, email, senha} = req.body;
 
  if (!id || !nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }
 
  let novoUsuario = new Usuario(id, nome, email, senha);
 
  lista_usuarios.push(novoUsuario);
 
  try {
    const connection = await usarConexao();
    const [rows] = await connection.query('INSERT INTO mydatabase.usuarios(nome, email, senha) VALUES (?, ?, ?);',
      [id, nome, email, senha]
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
      return connection.query('SELECT * FROM estoque.produtos');
    })
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(error => {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ error: 'Erro ao listar produtos' });
    });
});
 
app.post('/cadastrarproduto', async (req, res) => {
  let { _id_produto, _nome, _descricao, _id_vendedor, _data_cadastro, _ativo } = req.body;
 
  if (!_id_produto || !_nome || !_descricao || !_id_vendedor || !_data_cadastro || _ativo === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }
 
  let novoProduto = new Produto(_id_produto, _nome, _descricao, _id_vendedor, _data_cadastro, _ativo);
 
  lista_produtos.push(novoProduto);
 
  try {
    const connection = await usarConexao();
    const [rows] = await connection.query('INSERT INTO estoque.produtos(id_produto, nome, descricao, id_vendedor, data_cadastro, ativo) VALUES (?, ?, ?, ?, ?, ?);',
      [_id_produto, _nome, _descricao, _id_vendedor, _data_cadastro, _ativo]
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