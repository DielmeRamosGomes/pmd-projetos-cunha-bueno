<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOOKS</title>
    <link rel="stylesheet" href="css/estilo.css">
</head>
<body>

   <header>
    <DIV class="MEIO">
        <h1>BOOKS LEGAL</h1>
        <form action="#" method="get" class="barra-pesquisa">
            <input type="text" name="search" placeholder="Digite o nome do livro..." />
            <button type="submit">Pesquisar</button>

        </form>
           <?php if (isset($_SESSION['usuario_nome'])): ?>
    <span>Olá, <?php echo htmlspecialchars($_SESSION['usuario_nome']); ?>!</span>
<?php else: ?>
    <a href="login/Login.html" class="botao-login">Entrar / Cadastrar-se</a>
<?php endif; ?>

   </header>

   <main>
    <DIV class="MEIO">
        <section class="livros">
            <div class="livro">
                <img src="img/Capa-O-Sol-e-a-Estrela-1.jpg" alt="O Sol e a Estrela">
                <div>
                    <h2>O Sol e a Estrela </h2>
                    <p>rick riordan</p>
                    <p>Gênero/categoria: Fantasia e Ficção Científica, Infantojuvenil</p>
                    <p>Os semideuses Nico e Will enfrentam uma
                         jornada perigosa pelo Tártaro.</p>
                    <p><strong>R$ 69,90</strong></p>
                    <a href="produt2.html">Comprar</a>
                </div>
            </div>

            <div class="livro">
                <img src="img/CALICE DOS DEUSES.jpg" alt="O Cálice dos Deuses - Vol. 1">
                <div>
                    <h2>O Cálice dos Deuses - Vol. 1</h2>
                    <p>rick riordan</p>
                    <p>Gênero/categoria: Fantasia e Ficção Científica, Infantojuvenil</p>
                    <p>Depois de salvar o mundo inúmeras vezes de monstros, Percy Jackson 
                        recebe uma nova missão: recuperar um cálice divino antes que caia em mãos erradas.</p>
                    <p><strong>R$ 59,90</strong></p>
                    <a href="produto.html">Comprar</a>
                </div>

            </div>
            <div class="livro">
                <img src="img/mulher no escuro.jpg" alt="Uma mulher no escuro">
                <div>
                    <h2>Uma mulher no escuro</h2>
                    <p>autor: Raphael Montes</p>
                    <p>Gênero / Categoria: Thriller, Suspense</p>
                    <p>Uma jovem solitária confronta segredos obscuros de seu passado após um crime brutal mudar 
                        sua vida para sempre.</p>
                    <p><strong>R$ 52,90</strong></p>
                    <a href="produto3.html">Comprar</a>
                </div>
            </div>
        </section>
    </DIV>
   </main>

   <footer>
        <p>&copy; 2025 Livraria Web - Todos os direitos reservados.</p>
   </footer>
<script>
    alert("sejam bem-vindos ao sua livra online")
</script>
</body>
</html>