let personagens = [];

const form = document.getElementById('formPersonagem');
const campoNome = document.getElementById('nome');
const campoTipo = document.getElementById('tipo');
const campoPerigo = document.getElementById('perigo');
const lista = document.getElementById('listaPersonagens');
const contador = document.getElementById('contador');

carregar();
renderizar();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const p = {
    id: Date.now(),
    nome: campoNome.value.trim(),
    tipo: campoTipo.value.trim(),
    perigo: parseInt(campoPerigo.value) || 1
  };

  personagens.push(p);
  salvar();
  renderizar();
  form.reset();
});

function salvar() {
  localStorage.setItem('monstros', JSON.stringify(personagens));
}

function carregar() {
  const dados = localStorage.getItem('monstros');
  if (dados) personagens = JSON.parse(dados);
}

function excluir(id) {
  personagens = personagens.filter(p => p.id !== id);
  salvar();
  renderizar();
}

// Limpa todos os monstros (com confirmação)
function limparTudo() {
  if (personagens.length === 0) return;
  if (confirm('Tem certeza que deseja apagar TODOS os monstros?')) {
    personagens = [];
    salvar();
    renderizar();
  }
}

// ---------- RENDERIZAÇÃO ATUALIZADA ----------

function renderizar() {
  lista.innerHTML = '';
  personagens.forEach(p => {
    // Cria o card
    const div = document.createElement('div');
    div.className = 'card';

    // Informações do monstro
    const info = document.createElement('span');
    info.className = 'info';
    info.innerHTML = `<strong>${p.nome}</strong> (${p.tipo}) — Perigo: ${p.perigo}/5`;

    // Botão excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '🗑️ Excluir';
    btnExcluir.onclick = () => excluir(p.id);

    div.appendChild(info);
    div.appendChild(btnExcluir);
    lista.appendChild(div);
  });
  contador.textContent = personagens.length;
}