// ====================
// Banco de dados inicial
// ====================
let hp = 100;
let mp = 50;
let andar = 30; // começa no +30

const dungeon = {
  "+30": "Altar das Águias Eternas – um templo suspenso nas nuvens.",
  "+29": "Salão dos Sussurros Celestiais – ecos de profecias antigas.",
  "-30": "Núcleo do Esquecimento – uma máquina viva devora memórias.",
  "0": "Nexus da Realidade – o tempo para, o Metamorfo aguarda..."
};

const eventos = {
  positivo: [
    "✨ Você encontra uma fonte mágica e recupera 20 HP.",
    "💎 Um cristal arcano aumenta seu MP em +10."
  ],
  neutro: [
    "❓ Uma porta trancada bloqueia seu caminho...",
    "📜 Um pergaminho antigo pede para ser lido."
  ],
  negativo: [
    "👹 Um monstro surge das sombras! Você perde 15 HP.",
    "☠️ Uma armadilha dispara flechas! Você perde 10 HP."
  ]
};

// ====================
// Funções principais
// ====================
function atualizarStatus() {
  document.getElementById("hp").innerText = hp;
  document.getElementById("mp").innerText = mp;
  document.getElementById("andar").innerText = (andar >= 0 ? "+"+andar : andar);
}

function mostrarDialogo(texto) {
  const dialog = document.getElementById("dialog-box");
  dialog.innerHTML = `<p>${texto}</p>`;
}

function eventoAleatorio() {
  const sorteio = Math.random();
  if (sorteio < 0.2) return eventos.positivo[Math.floor(Math.random()*eventos.positivo.length)];
  if (sorteio < 0.5) return eventos.neutro[Math.floor(Math.random()*eventos.neutro.length)];
  return eventos.negativo[Math.floor(Math.random()*eventos.negativo.length)];
}

// ====================
// Ações do jogador
// ====================
function explorar() {
  const desc = dungeon["+"+andar] || dungeon[""+andar] || "Um andar desconhecido...";
  const evento = eventoAleatorio();
  mostrarDialogo(`🏰 [Andar ${andar}] ${desc}<br><br>${evento}`);

  // efeitos simples
  if (evento.includes("perde")) {
    const perda = parseInt(evento.match(/\d+/)[0]);
    hp = Math.max(0, hp - perda);
  }
  if (evento.includes("recupera")) {
    const ganho = parseInt(evento.match(/\d+/)[0]);
    hp = Math.min(100, hp + ganho);
  }
  if (evento.includes("MP")) {
    mp += 10;
  }
  atualizarStatus();

  // descer andar
  andar--;
}

function descansar() {
  hp = Math.min(100, hp + 20);
  mp = Math.min(50, mp + 10);
  mostrarDialogo("🛌 Você descansa e recupera forças.");
  atualizarStatus();
}

function fugir() {
  mostrarDialogo("🏃 Você tenta fugir... mas algo sempre vigia na escuridão.");
}

function usarItem() {
  mostrarDialogo("🧪 Você usa uma poção e recupera 30 HP!");
  hp = Math.min(100, hp + 30);
  atualizarStatus();
}

// ====================
// Configurações
// ====================
function toggleSettings() {
  document.getElementById("settings-box").classList.toggle("hidden");
}

function salvarJogo() {
  localStorage.setItem("rpgSave", JSON.stringify({hp, mp, andar}));
  mostrarDialogo("💾 Jogo salvo!");
}

function carregarJogo() {
  const save = localStorage.getItem("rpgSave");
  if (save) {
    const data = JSON.parse(save);
    hp = data.hp;
    mp = data.mp;
    andar = data.andar;
    atualizarStatus();
    mostrarDialogo("📂 Jogo carregado!");
  }
}

// ====================
// Inicialização
// ====================
window.onload = () => {
  atualizarStatus();
  carregarJogo();
};
