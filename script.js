/* ── CUSTOM CURSOR ── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

// Smooth trailing ring
(function loopRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loopRing);
})();

// Cursor grow on hover
document.querySelectorAll('a, button, .bc, .sk, .nav-dot').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '18px';
    cur.style.height = '18px';
    ring.style.width  = '54px';
    ring.style.height = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '10px';
    cur.style.height = '10px';
    ring.style.width  = '36px';
    ring.style.height = '36px';
  });
});

/* ── SMOOTH PAGE NAVIGATION ── */
function goTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* ── NAV DOT + STUCK STATE ── */
const nav  = document.getElementById('nav');
const dots = document.querySelectorAll('.nav-dot');

const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Update active dot
      dots.forEach((d) => d.classList.remove('active'));
      const activeDot = document.querySelector(`.nav-dot[data-page="${entry.target.id}"]`);
      if (activeDot) activeDot.classList.add('active');

      // Sticky nav background only on pages 2 & 3
      nav.classList.toggle('stuck', entry.target.id !== 'p1');
    }
  });
}, { threshold: 0.5 });

['p1', 'p2', 'p3'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) pageObserver.observe(el);
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
