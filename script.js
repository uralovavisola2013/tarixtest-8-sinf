const app = document.getElementById("app");

let state = { fan: null, mavzu: null, quiz: [], index: 0, score: 0, wrong: [] };

// ---------- Yordamchi funksiyalar ----------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

function fanlar() {
  return [...new Set(QUESTIONS.map(q => q.fan))];
}

function mavzular(fan) {
  return [...new Set(QUESTIONS.filter(q => q.fan === fan).map(q => q.mavzu))];
}

function savollarSoni(fan, mavzu) {
  return QUESTIONS.filter(q => q.fan === fan && q.mavzu === mavzu).length;
}

// ---------- Ekranlar ----------
function showHome() {
  state = { fan: null, mavzu: null, quiz: [], index: 0, score: 0, wrong: [] };
  let html = `<div class="card"><h2>Fanni tanlang</h2>`;
  const list = fanlar();
  if (list.length === 0) {
    html += `<p class="empty">Hozircha savollar yo'q.</p>`;
  }
  list.forEach((f, i) => {
    const n = QUESTIONS.filter(q => q.fan === f).length;
    html += `<button class="btn" data-fan="${i}">${esc(f)}<small>${n} ta savol</small></button>`;
  });
  html += `</div>`;
  app.innerHTML = html;
  app.querySelectorAll("[data-fan]").forEach(b => {
    b.onclick = () => showTopics(list[b.dataset.fan]);
  });
}

function showTopics(fan) {
  state.fan = fan;
  const list = mavzular(fan);
  let html = `<button class="back" id="back">← Orqaga</button><div class="card"><h2>${esc(fan)}: mavzuni tanlang</h2>`;
  list.forEach((m, i) => {
    html += `<button class="btn" data-m="${i}">${esc(m)}<small>${savollarSoni(fan, m)} ta savol</small></button>`;
  });
  html += `</div>`;
  app.innerHTML = html;
  document.getElementById("back").onclick = showHome;
  app.querySelectorAll("[data-m]").forEach(b => {
    b.onclick = () => showCount(list[b.dataset.m]);
  });
}

function showCount(mavzu) {
  state.mavzu = mavzu;
  const total = savollarSoni(state.fan, mavzu);
  const options = [5, 10, 15, 20, 30].filter(n => n < total);
  options.push(total); // oxirgisi: hammasi

  let html = `<button class="back" id="back">← Orqaga</button>
    <div class="card"><h2>${esc(mavzu)}</h2>
    <p class="meta">Nechta savol yechmoqchisiz? (jami ${total} ta)</p>
    <div class="count-grid">`;
  options.forEach(n => {
    html += `<button class="btn" data-n="${n}">${n === total ? "Hammasi (" + n + ")" : n + " ta"}</button>`;
  });
  html += `</div></div>`;
  app.innerHTML = html;
  document.getElementById("back").onclick = () => showTopics(state.fan);
  app.querySelectorAll("[data-n]").forEach(b => {
    b.onclick = () => startQuiz(parseInt(b.dataset.n, 10));
  });
}

function startQuiz(n) {
  const pool = QUESTIONS.filter(q => q.fan === state.fan && q.mavzu === state.mavzu);
  state.quiz = shuffle(pool).slice(0, n).map(q => {
    // Variantlarni aralashtiramiz, to'g'ri javobni kuzatib boramiz
    const order = shuffle(q.variantlar.map((v, i) => ({ v, correct: i === q.javob })));
    return { ...q, order };
  });
  state.index = 0;
  state.score = 0;
  state.wrong = [];
  showQuestion();
}

function showQuestion() {
  const q = state.quiz[state.index];
  const total = state.quiz.length;
  const letters = ["A", "B", "C", "D", "E", "F"];

  let html = `<div class="card">
    <div class="progress"><div style="width:${(state.index / total) * 100}%"></div></div>
    <div class="meta">Savol ${state.index + 1} / ${total}</div>
    <div class="question">${esc(q.savol)}</div>`;
  q.order.forEach((o, i) => {
    html += `<button class="btn option" data-i="${i}">${letters[i]}) ${esc(o.v)}</button>`;
  });
  html += `<div id="after"></div></div>`;
  app.innerHTML = html;

  app.querySelectorAll(".option").forEach(b => {
    b.onclick = () => answer(parseInt(b.dataset.i, 10));
  });
}

function answer(i) {
  const q = state.quiz[state.index];
  const buttons = app.querySelectorAll(".option");
  const chosen = q.order[i];

  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (q.order[idx].correct) b.classList.add("correct");
  });

  if (chosen.correct) {
    state.score++;
  } else {
    buttons[i].classList.add("wrong");
    state.wrong.push({
      savol: q.savol,
      sizniki: chosen.v,
      togri: q.order.find(o => o.correct).v,
      izoh: q.izoh
    });
  }

  const last = state.index === state.quiz.length - 1;
  let after = "";
  if (q.izoh) after += `<div class="explain">${esc(q.izoh)}</div>`;
  after += `<button class="btn primary" id="next">${last ? "Natijani ko'rish" : "Keyingi savol →"}</button>`;
  document.getElementById("after").innerHTML = after;
  document.getElementById("next").onclick = () => {
    if (last) showResult();
    else { state.index++; showQuestion(); }
  };
}

function showResult() {
  const total = state.quiz.length;
  const percent = Math.round((state.score / total) * 100);
  let msg = "Yana mashq qiling, albatta natija yaxshilanadi!";
  if (percent >= 90) msg = "Ajoyib natija!";
  else if (percent >= 70) msg = "Yaxshi natija!";
  else if (percent >= 50) msg = "Fikr yomon emas, biroz takrorlang.";

  let html = `<div class="card">
    <h2>Natija</h2>
    <div class="score">${state.score} / ${total}</div>
    <div class="score-text">${percent}% • ${msg}</div>`;

  if (state.wrong.length > 0) {
    html += `<h2>Xatolar ustida ishlash</h2>`;
    state.wrong.forEach(w => {
      html += `<div class="review-item">
        <div><b>${esc(w.savol)}</b></div>
        <div class="your">Sizning javobingiz: ${esc(w.sizniki)}</div>
        <div class="right">To'g'ri javob: ${esc(w.togri)}</div>
        ${w.izoh ? `<div>${esc(w.izoh)}</div>` : ""}
      </div>`;
    });
  }

  html += `<button class="btn primary" id="again">Qayta yechish</button>
    <button class="btn primary" id="topics">Boshqa mavzu</button>
    <button class="btn primary" id="home">Bosh sahifa</button></div>`;
  app.innerHTML = html;

  document.getElementById("again").onclick = () => showCount(state.mavzu);
  document.getElementById("topics").onclick = () => showTopics(state.fan);
  document.getElementById("home").onclick = showHome;
}

showHome();
