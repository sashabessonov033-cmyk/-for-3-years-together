const START_DATE = new Date('2023-11-27T00:00:00'); // дата начала отношений
const REASONS = [
  'Твоя улыбка',
  'Ты умеешь меня рассмешить',
  'Ты поддерживаешь меня',
  'С тобой любое место — дом',
  'Твой голос по утрам',
  'Просто потому что это ты'
];

// Счётчик
const counter = document.getElementById('counter');
function tick() {
  let s = Math.max(0, Math.floor((Date.now() - START_DATE) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  const m = Math.floor(s / 60); s %= 60;
  counter.innerHTML = [[d, 'дней'], [h, 'часов'], [m, 'минут'], [s, 'секунд']]
    .map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
}
tick();
setInterval(tick, 1000);

// Появление событий при скролле
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('show');
    io.unobserve(e.target);
  }
}), { threshold: 0.3 });
document.querySelectorAll('.event').forEach(el => io.observe(el));

// Карточки-причины
const grid = document.getElementById('reasons');
REASONS.forEach(text => {
  const b = document.createElement('button');
  b.className = 'flip';
  b.innerHTML = `<div class="inner"><div class="face front">❤️</div><div class="face back">${text}</div></div>`;
  b.onclick = () => b.classList.toggle('open');
  grid.appendChild(b);
});

// Письмо
document.getElementById('openLetter').onclick = e => {
  document.getElementById('letterText').classList.add('show');
  e.target.style.display = 'none';
};
