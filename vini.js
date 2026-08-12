let personagens = [];

const form = document.getElementById('formPersonagem');
const campoNome = document.getElementById('nome');
const campoTipo = document.getElementById('tipo');
const campoPerigo = document.getElementById('perigo');
const lista = document.getElementById('listaPersonagens');
const contador = document.getElementById('contador');


carregar();
renderizar();

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const p = {
    id: Date.now(),
    nome: campoNome.value.trim(),
    tipo: campoTipo.value.trim(),
    perigo: campoPerigo.value || 1
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

function renderizar() {
  lista.innerHTML = '';
  personagens.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.nome}</strong> (${p.tipo}) — Perigo: ${p.perigo}/5`;
    lista.appendChild(div);
  });
  contador.textContent = personagens.length;
}