
function mostrarPopup(htmlResultado) {
  const popup = document.getElementById('popup');
  const popupResultado = document.getElementById('popup-resultado');
  popupResultado.innerHTML = htmlResultado;
  popup.style.display = 'flex';
}

function fecharPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  limparResultado(); // Limpar resultado ao fechar o popup
}



const plantonistas = [];

const filiaisCidades = {
  Clig: ["araraquara", "sao carlos", "americo brasiliense", "ibate", "ibitinga", "matao", "descavaldo", "santa lucia", "rincao", "guatapara", "motuca", "guariba", "gaviao peixoto", "nova europa", "tabatinga", "itapolis"],
  Netbarretos: ["barretos", "bebedouro", "colina", "Guaira", "jaborandi", "jaboticabal", "olimpia", "pitangueiras"],
  LpNet: ["aguas de santa barbara", "agudos", "alfredo guedes", "aparecida de sao manuel", "arandu", "areiopolis", "avare", "barra bonita", "bauru", "boa esperanca do sul", "bocaina", "borborema", "borebi", "botucatu", "botucatu", "candido rodrigues", "cerqueira cesar", "curupa", "dobrada", "dois corregos", "dourado", "fernando prestes", "gaviao peixoto", "guaianas", "guarapiranga", "holambra ii", "iaras", "igaracu do tiete", "ibitinga", "igaracu do tiete", "itai", "itajobi", "itapolis", "itapui", "itatinga", "jau", "lencois paulista", "lins", "macatuba", "manduri", "matao", "mineiros do tiete", "monte alto", "nova europa", "oleo", "paranapanema", "pardinho", "pederneiras", "pedro alexandrino", "pindorama", "piratininga", "potunduva", "pratania", "ribeirao bonito", "rubiao jr", "santa adelia", "santa ernestina", "sao carlos", "sao manuel", "serrinha", "tabatinga", "trabiju", "vangloria", "vitoriana"]

};

function localizarFilial() {
  const cidadeLocalizar = document.getElementById('cidadeLocalizar').value.toLowerCase();
  let filialEncontrada = '';

  for (const filial in filiaisCidades) {
    if (filiaisCidades[filial].includes(cidadeLocalizar)) {
      filialEncontrada = filial;
      break;
    }
  }

  if (filialEncontrada) {
    const modalContent = `
<div style="width: 380px; padding: 20px;">
  <p style="font-size: 22px;">A cidade <strong style="text-decoration: underline;">${cidadeLocalizar}</strong> pertence à filial <strong style="text-decoration: underline;">${filialEncontrada.toUpperCase()}</strong>.</p>
</div>
`;
    mostrarPopup(modalContent);
  } else {
    const modalContent = `
<div style="width: 400px; padding: 20px;">
  <p style="font-size: 18px;">Não foi encontrada uma filial para a cidade <strong style="text-decoration: underline;">${cidadeLocalizar}</strong>.</p>
</div>
`;
    mostrarPopup(modalContent);
  }
}




// Função para limpar o conteúdo da div de resultado
function limparResultado() {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';
}

// Função para mostrar o formulário desejado
function mostrarFormulario(tipoFormulario) {
  limparResultado(); // Limpar resultado ao mudar de formulário
  const cadastroForm = document.getElementById('cadastroForm');
  const consultaForm = document.getElementById('consultaForm');

  cadastroForm.style.display = 'none';
  consultaForm.style.display = 'none';

  if (tipoFormulario === 'cadastro') {
    cadastroForm.style.display = 'block';
  } else if (tipoFormulario === 'consulta') {
    consultaForm.style.display = 'block';
  }
}

function cadastrar() {
  limparResultado(); // Limpar resultado ao cadastrar
  const nomePlantonista = document.getElementById('nomePlantonista').value;
  const nomeFilia = document.getElementById('nomeFiliaCadastro').value;
  const telefone = document.getElementById('telefone').value;
  const dataInicio = document.getElementById('dataInicio').value;
  const dataFim = document.getElementById('dataFim').value;
  const horarioInicio = document.getElementById('horarioInicio').value;
  const horarioFim = document.getElementById('horarioFim').value;
  const setor = document.getElementById('setor').value;


  const cadastro = {
    nomePlantonista,
    nomeFilia,
    telefone,
    dataInicio,
    dataFim,
    horarioInicio,
    horarioFim,
    setor,
  };

  plantonistas.push(cadastro);
  alert('Cadastro realizado com sucesso!');
  limparCamposCadastro();
}

function limparCamposCadastro() {
  document.getElementById('nomePlantonista').value = '';
  document.getElementById('nomeFiliaCadastro').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('dataInicio').value = '';
  document.getElementById('dataFim').value = '';
  document.getElementById('horarioInicio').value = '';
  document.getElementById('horarioFim').value = '';
} function carregarCidades() {
  const filialSelecionada = document.getElementById('nomeFiliaCadastro').value;
  const cidadeCadastroSelect = document.getElementById('cidadeCadastro');

  cidadeCadastroSelect.innerHTML = '';

  if (filialSelecionada in filiaisCidades) {
    filiaisCidades[filialSelecionada].forEach(cidade => {
      const option = document.createElement('option');
      option.value = cidade;
      option.textContent = cidade;
      cidadeCadastroSelect.appendChild(option);
    });
  }
}

function carregarCidadesConsulta() {
  const filialSelecionada = document.getElementById('filtroFilial').value;
  const filtroCidadeInput = document.getElementById('filtroCidade');

  filtroCidadeInput.value = '';

  if (filialSelecionada in filiaisCidades && filialSelecionada !== 'naoSei') {
    filtroCidadeInput.placeholder = `Todas as cidades de ${filialSelecionada}`;
  } else {
    filtroCidadeInput.placeholder = 'Todas as cidades';
  }
}

function consultar() {
  const consultaData = document.getElementById('consultaData').value;
  const filtroFilial = document.getElementById('filtroFilial').value;

  const dataConsulta = new Date(consultaData); // Converter a string para um objeto Date

  const plantonistasFiltrados = plantonistas.filter(plantonista => {
    const dataInicio = new Date(plantonista.dataInicio);
    const dataFim = new Date(plantonista.dataFim);

    // Comparar se a data de consulta está dentro do intervalo do plantão
    return (
      dataConsulta >= dataInicio &&
      dataConsulta <= dataFim &&
      (filtroFilial === '' || plantonista.nomeFilia === filtroFilial)
    );
  });

  let htmlResultado = `<h3>Plantonistas de ${consultaData}</h3>`;
  if (plantonistasFiltrados.length > 0) {
    htmlResultado += `
<table>
  <thead>
    <tr>
      <tr>
      <th style="padding-right: 64px;">Nome</th>
      <th style="padding-right: 30px;">Filial</th>
      <th style="padding-right: 54px;">Telefone</th>
      <th style="padding-right: 65px;">Horário</th>
      <th style="padding-right: 30px;">Setor</th>
      <th style="padding-right: 72px;">Whatsapp</th>
      <th style="padding-right: 72px;">Ação</th> <!-- Adicione esta coluna para o botão de deletar -->
    </tr>
    </tr>
  </thead>
  <tbody>
    ${plantonistasFiltrados.map(plantonista => {
      return `
        <tr>
          <td>${plantonista.nomePlantonista}</td>
          <td>${plantonista.nomeFilia}</td>
          <td>${plantonista.telefone}</td>
          <td>${plantonista.horarioInicio} - ${plantonista.horarioFim}</td>
          <td>${plantonista.setor}</td> <!-- Adicione esta linha para o setor -->
          <td>
            <img
              src="wpp.png"
              alt="Chat com o plantonista"
              width="35"
              height="35"
              onclick="window.open('https://api.whatsapp.com/send?phone=${55 + plantonista.telefone}', '_blank')"
              style="padding-right: 0px; padding-left: 22px; cursor: pointer; animation: pulse 1s infinite;"
            />
          </td>
          <td>${criarBotaoDeletar(plantonista.nomePlantonista)}</td> <!-- Adicione esta coluna para o botão de deletar -->
        </tr>
      `;
    }).join('')}
  </tbody>
</table>
`;
  } else {
    htmlResultado += '<p>Nenhum resultado encontrado para a data e/ou filial selecionadas.</p>';
  }

  mostrarPopup(htmlResultado);
}

function mostrarFormulario(tipoFormulario) {
  limparResultado(); // Limpar resultado ao mudar de formulário
  const cadastroForm = document.getElementById('cadastroForm');
  const consultaForm = document.getElementById('consultaForm');
  const footer = document.querySelector('footer');

  cadastroForm.style.display = 'none';
  consultaForm.style.display = 'none';

  // Ocultar o footer se estiver no formulário de cadastro
  if (tipoFormulario === 'cadastro') {
    cadastroForm.style.display = 'block';
    footer.style.display = 'none';
  } else if (tipoFormulario === 'consulta') {
    consultaForm.style.display = 'block';
    footer.style.display = 'block'; // Mostrar o footer para outros formulários
  }
}

function abrirMapa() {
  document.getElementById("iframe-mapa").style.display = "block";
  document.getElementById("fecharMapa").style.display = "block";
  document.getElementById("botao-mapa").style.display = "none";
}

function fecharMapa() {
  document.getElementById("iframe-mapa").style.display = "none";
  document.getElementById("fecharMapa").style.display = "none";
  document.getElementById("botao-mapa").style.display = "block";
}

// Função para mostrar o formulário desejado
function mostrarFormulario(tipoFormulario) {

  limparResultado(); // Limpar resultado ao mudar de formulário
  const cadastroForm = document.getElementById('cadastroForm');
  const consultaForm = document.getElementById('consultaForm');
  const botoesOperacao = document.getElementById('botoesOperacao');
  const tituloH2 = document.getElementById('center'); // Adicionado para pegar o elemento h2

  cadastroForm.style.display = 'none';
  consultaForm.style.display = 'none';

  // Ocultar os botões de consulta e cadastro
  botoesOperacao.style.display = 'none';

  if (tipoFormulario === 'cadastro') {
    cadastroForm.style.display = 'block';
    tituloH2.style.display = 'none'; // Oculta o elemento h2
  } else if (tipoFormulario === 'consulta') {
    consultaForm.style.display = 'block';
    tituloH2.style.display = 'flex'; // Mostra o elemento h2 para outros formulários
  }

}
function voltarTelaInicial() {
  const cadastroForm = document.getElementById('cadastroForm');
  const consultaForm = document.getElementById('consultaForm');
  const botoesOperacao = document.getElementById('botoesOperacao');
  const tituloH2 = document.getElementById('center');

  cadastroForm.style.display = 'none';
  consultaForm.style.display = 'none';
  botoesOperacao.style.display = 'flex';
  tituloH2.style.display = 'flex';

  // Resetar o formulário de cadastro
  limparCamposCadastro();

  // Limpar os campos do formulário de consulta
  limparCamposConsulta();
}


function limparCamposConsulta() {
  // Adicione aqui qualquer código necessário para limpar os campos do formulário de consulta
  const consultaData = document.getElementById('consultaData');
  const filtroFilial = document.getElementById('filtroFilial');

  consultaData.value = '';
  filtroFilial.value = '';
}

function criarBotaoDeletar(nomePlantonista) {
  return `
<button onclick="deletarPlantonista('${nomePlantonista}')">
Deletar
</button>
`;
}

function deletarPlantonista(nomePlantonista) {
  const confirmacao = confirm(`Deseja realmente deletar ${nomePlantonista}?`);

  if (confirmacao) {
    const indice = plantonistas.findIndex(plantonista => plantonista.nomePlantonista === nomePlantonista);

    if (indice !== -1) {
      plantonistas.splice(indice, 1);
      alert(`${nomePlantonista} deletado com sucesso!`);
      consultar(); // Atualiza a lista após a exclusão
    }
  }
}
// Adicione isto ao seu script JavaScript existente
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Implemente lógica de autenticação aqui
  // Exemplo: Verificar se as credenciais são válidas

  if (username === 'admin' && password === 'admin') {
    alert('Login bem-sucedido!');
    window.location.href = 'index.html';
  } else {
    alert('Credenciais inválidas. Tente novamente.');
  }
}


function semLogin() {
  alert('Função semLogin chamada!');
  // Adicionando um parâmetro à URL para indicar que o botão deve ser ocultado
  window.location.href = 'index.html?ocultarBotao=true';
}

document.addEventListener('DOMContentLoaded', function () {
  // Verificar se o parâmetro 'ocultarBotao' está presente na URL
  const urlParams = new URLSearchParams(window.location.search);
  const ocultarBotao = urlParams.get('ocultarBotao');

  if (ocultarBotao === 'true') {
    var btn1 = document.querySelector('.btn1');
    if (btn1) {
      btn1.style.display = 'none';
    }
  }
});

// fazer um link ref com a logo da desktop para a pagina de login.