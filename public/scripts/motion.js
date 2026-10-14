const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  revealOnScroll();
  typeTerminal();
}

// Only elements that start below the fold are hidden, so nothing already on screen flashes.
function revealOnScroll() {
  const pending = [...document.querySelectorAll('[data-reveal]')].filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight,
  );
  if (pending.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      let step = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        observer.unobserve(el);
        el.style.transitionDelay = `${Math.min(step, 4) * 70}ms`;
        step += 1;
        el.addEventListener('transitionend', function done(event) {
          if (event.target !== el) return;
          el.removeEventListener('transitionend', done);
          el.classList.remove('reveal', 'is-revealed');
          el.style.transitionDelay = '';
        });
        el.classList.add('is-revealed');
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  for (const el of pending) el.classList.add('reveal');
  for (const el of pending) observer.observe(el);
}

function typeTerminal() {
  const terminal = document.querySelector('[data-terminal]');
  const command = terminal?.querySelector('.terminal-command');
  const output = terminal?.querySelector('.terminal-output');
  if (!terminal || !command || !output) return;

  let lines;
  try {
    lines = JSON.parse(terminal.getAttribute('data-terminal') ?? '[]');
  } catch {
    return;
  }
  if (!Array.isArray(lines) || lines.length < 2) return;

  let onScreen = true;
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
  }).observe(terminal);

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const whenVisible = async () => {
    while (document.hidden || !onScreen) await wait(500);
  };

  const cycle = async () => {
    let index = 0;
    await wait(5000);
    for (;;) {
      await whenVisible();
      terminal.classList.add('is-typing');
      output.classList.remove('is-shown');
      output.textContent = '';
      while (command.textContent.length > 0) {
        command.textContent = command.textContent.slice(0, -1);
        await wait(12);
      }

      index = (index + 1) % lines.length;
      const next = lines[index];
      await wait(160);
      for (const char of next.command) {
        command.textContent += char;
        await wait(35 + Math.random() * 35);
      }
      terminal.classList.remove('is-typing');

      await wait(220);
      output.textContent = next.output;
      output.classList.add('is-shown');
      await wait(5000);
    }
  };

  cycle();
}
