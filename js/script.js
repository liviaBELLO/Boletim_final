const playButton = document.getElementById("playButton");
const audioPlayer = document.getElementById("audioPlayer");

playButton.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playButton.textContent = "Play";
  }
});

const alunos = [];
const mediaGeral = [];

function adicionarAluno() {
  let nome = document.getElementById("input-nome").value;
  let nota1 = parseInt(document.getElementById("input-nota1").value);
  let nota2 = parseInt(document.getElementById("input-nota2").value);
  let nota3 = parseInt(document.getElementById("input-nota3").value);
  let nota4 = parseInt(document.getElementById("input-nota4").value);

  if(nota1 < 0 || nota1 > 100 ||nota2 < 0 || nota2 > 100 ||nota3 < 0 || nota3 > 100 ||nota4 < 0 || nota4 > 100){

    window.alert("Digite uma nota entre 0 e 100 !!!");

    location.reload();
  }

  const notas = [nota1, nota2, nota3, nota4];

  let media = (nota1 + nota2 + nota3 + nota4) / 4;

  let situacao = "";

  if (media >= 70) {
    situacao = "Aprovado";
  } else if (media >= 50 && media < 70) {
    situacao = "Recuperacao";
  } else {
    situacao = "Reprovado";
  }

  const aluno = {
    nome: nome,
    notas: notas,
    media: media,
    situacao: situacao,
  };

  mediaGeral.push(aluno.media);

  alunos.push(aluno);

  // Limpar campos
  document.getElementById("input-nome").value = "";
  document.getElementById("input-nota1").value = "";
  document.getElementById("input-nota2").value = "";
  document.getElementById("input-nota3").value = "";
  document.getElementById("input-nota4").value = "";

  if (alunos.length === 5) {
    criarNovaPagina();
  }
}

function criarTabela() {
  const somaMediaGeral = mediaGeral.reduce((total, valor) => total + valor);
  const mediaGeralFinal = somaMediaGeral / alunos.length;

  const alunosAbaixoMedia = alunos
    .filter((aluno) => aluno.media < mediaGeralFinal)
    .map((aluno) => aluno.nome);

  const tabela = alunos.map((aluno) => {
    let corSituacao = "";

    // Adiciona uma classe CSS baseada na situação do aluno
    switch (aluno.situacao) {
      case "Aprovado":
        corSituacao = "cor-verde";
        break;
      case "Recuperacao":
        corSituacao = "cor-amarela";
        break;
      case "Reprovado":
        corSituacao = "cor-vermelha";
        break;
      default:
        corSituacao = "";
    }

    return `
        <table class="tabela" style="margin-top: 20px;" ${corSituacao}>
        <table border="1">
            <tr>
                <th>Aluno</th>
                <th>1° bimestre</th>
                <th>2° bimestre</th>
                <th>3° bimestre</th>
                <th>4° bimestre</th>
                <th>Média</th>
                <th>Situação</th>
            </tr>
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.notas[0]}</td>
                <td>${aluno.notas[1]}</td>
                <td>${aluno.notas[2]}</td>
                <td>${aluno.notas[3]}</td>
                <td>${aluno.media}</td>
                <td class="${corSituacao}">${aluno.situacao}</td>
            </tr>
            <tr>
                <td colspan="7">Média Geral:${mediaGeralFinal.toFixed(1)}</td>
            </tr>
            <tr>
                <td colspan="7">Alunos abaixo da média: ${alunosAbaixoMedia}</td>
            </tr>
        </table>
        `;
  });

  return tabela.join("");
}

function criarNovaPagina() {
  // Cria um novo documento HTML
  const novaPagina =
    document.implementation.createHTMLDocument("Tabela de Alunos");

  // Adiciona o link para o arquivo CSS
  const linkCSS = document.createElement("link");
  linkCSS.rel = "stylesheet";
  linkCSS.type = "text/css";
  linkCSS.href = "css/style.css";
  novaPagina.head.appendChild(linkCSS);

  // Adiciona o conteúdo HTML da tabela ao corpo do novo documento
  novaPagina.body.innerHTML = `
        <header>
            <img src="./img/diplomado 1.png" alt="logo">
            <p>E E Escola zero</p>
        </header>
        
        <div id="criacaoTabela">${criarTabela()}</div>
        <div class="musica">
            <button id="playButton">Play</button>
        </div>
        <audio id="audioPlayer" src="./Justin_Bieber_-_One_Time_(Jesusful.com).mp3"></audio>
    `;

  // Abre uma nova janela com o conteúdo da nova página
  const novaJanela = window.open();
  novaJanela.document.write(novaPagina.documentElement.outerHTML);
}
