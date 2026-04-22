// McLaren Dental Associates — proposal demo
// Clean, minimal JS for the static proof-of-concept.

// ---------- Header scroll state ----------
// Over the hero: header is transparent. Past ~50px of scroll, it locks into a
// solid ivory fixed bar with the dark logo. Toggling a body class keeps all the
// transparent→opaque rules centralised in CSS.
(function headerScrollState(){
  const apply = () => document.body.classList.toggle('header-stuck', window.scrollY > 50);
  apply();
  window.addEventListener('scroll', apply, { passive: true });
})();

// ---------- Hero video → fade to poster when finished ----------
(function heroVideoToPoster(){
  const video = document.getElementById('heroVideo');
  const media = document.getElementById('heroMedia');
  if (!video || !media) return;
  video.addEventListener('ended', () => media.classList.add('video-ended'));
  // If the browser blocks autoplay or the source fails, reveal the poster immediately.
  video.addEventListener('error', () => media.classList.add('video-ended'));
})();

// ---------- Today-aware hours / utility bar ----------
// Hours (24h): Mon–Wed 08:00–17:30, Thu–Fri 08:00–16:30, Sat/Sun closed
const HOURS = {
  1: { open: '8:00', close: '5:30 pm', openMin: 8*60, closeMin: 17*60+30 },
  2: { open: '8:00', close: '5:30 pm', openMin: 8*60, closeMin: 17*60+30 },
  3: { open: '8:00', close: '5:30 pm', openMin: 8*60, closeMin: 17*60+30 },
  4: { open: '8:00', close: '4:30 pm', openMin: 8*60, closeMin: 16*60+30 },
  5: { open: '8:00', close: '4:30 pm', openMin: 8*60, closeMin: 16*60+30 },
};
(function markToday(){
  const now = new Date();
  const dow = now.getDay(); // 0 Sun, 1 Mon...
  const row = HOURS[dow];
  const utilHours = document.getElementById('utilHours');
  const mobileOpen = document.getElementById('mobileOpen');
  let label = 'Closed today';
  if (row) {
    const mins = now.getHours()*60 + now.getMinutes();
    label = (mins >= row.openMin && mins < row.closeMin)
      ? `Open today · closes ${row.close}`
      : `Today · ${row.open} am – ${row.close}`;
  }
  if (utilHours) utilHours.textContent = label;
  if (mobileOpen) mobileOpen.textContent = label;

  // highlight today's row
  document.querySelectorAll('#hoursList .d').forEach(el => {
    const d = parseInt(el.dataset.day, 10);
    const isToday = (d <= 5 && d === dow) || (d === 6 && (dow === 0 || dow === 6));
    if (isToday) {
      el.classList.add('today');
      const h = el.nextElementSibling;
      if (h) h.classList.add('today');
    }
  });
})();

// Year stamp
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Appointment modal ----------
let step = 1;
const totalSteps = 5;
function openModal(){ document.getElementById('modal').classList.add('open'); document.body.style.overflow='hidden'; goToStep(1); }
function closeModal(){ document.getElementById('modal').classList.remove('open'); document.body.style.overflow=''; }
function goToStep(n){
  step = n;
  document.querySelectorAll('.step').forEach(s => s.classList.remove('on'));
  document.querySelector('.step[data-step="'+n+'"]').classList.add('on');
  document.querySelectorAll('.step-dots i').forEach((d,i) => d.classList.toggle('on', i < n));
}
function nextStep(){ if(step<totalSteps) goToStep(step+1); }
function prevStep(){ if(step>1) goToStep(step-1); }
function finishModal(){ goToStep(5); }
window.openModal = openModal; window.closeModal = closeModal;
window.nextStep = nextStep; window.prevStep = prevStep; window.finishModal = finishModal;

document.querySelectorAll('.modal .step').forEach(s => {
  s.querySelectorAll('.opt').forEach(o => {
    o.addEventListener('click', () => {
      s.querySelectorAll('.opt').forEach(x => x.classList.remove('active'));
      o.classList.add('active');
    });
  });
  s.querySelectorAll('.time-slot').forEach(t => {
    t.addEventListener('click', () => {
      if(t.classList.contains('dis')) return;
      s.querySelectorAll('.time-slot').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });
});

// Set modal "next available" date label to tomorrow
(function setModalDate(){
  const el = document.getElementById('modalDate');
  if (!el) return;
  const tomorrow = new Date(Date.now() + 24*60*60*1000);
  const fmt = tomorrow.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
  el.textContent = `${fmt} · next available slots`;
})();

// ---------- Contact form ----------
document.querySelectorAll('#svcPills .pill').forEach(p => {
  p.addEventListener('click', () => {
    document.querySelectorAll('#svcPills .pill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
  });
});
function submitForm(e){
  e.preventDefault();
  document.getElementById('formSuccess').classList.add('visible');
  e.target.reset();
  setTimeout(() => document.getElementById('formSuccess').classList.remove('visible'), 6000);
  return false;
}
window.submitForm = submitForm;

// ---------- Mobile drawer ----------
function toggleDrawer(open){
  const d = document.getElementById('drawer');
  if (open === undefined) d.classList.toggle('open');
  else d.classList.toggle('open', open);
}
window.toggleDrawer = toggleDrawer;

// ---------- Financing calculator ----------
const calcRange = document.getElementById('calcRange');
const calcAmt   = document.getElementById('calcAmt');
const calcVal   = document.getElementById('calcVal');
let term = 12;
function fmt(n){ return '$' + Math.round(n).toLocaleString(); }
function updateCalc(){
  const amt = +calcRange.value;
  calcAmt.textContent = fmt(amt);
  // Short terms (<=24 mo) assume 0% promotional; longer terms estimate a typical APR.
  const apr = term <= 24 ? 0 : 0.149;
  const monthly = apr === 0 ? amt / term : (amt * (apr/12) / (1 - Math.pow(1 + apr/12, -term)));
  calcVal.innerHTML = fmt(monthly) + '<small> / mo</small>';
}
if (calcRange) {
  calcRange.addEventListener('input', updateCalc);
  document.querySelectorAll('#termSegs .seg').forEach(s => {
    s.addEventListener('click', () => {
      document.querySelectorAll('#termSegs .seg').forEach(x => x.classList.remove('active'));
      s.classList.add('active');
      term = +s.dataset.m;
      updateCalc();
    });
  });
  updateCalc();
}

// ---------- Escape closes overlays ----------
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); toggleDrawer(false); }
});
