const blocks = document.querySelectorAll('article pre');
for (const pre of blocks) {
  if (!(pre instanceof HTMLPreElement) || pre.querySelector('.copy-code')) continue;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-code';
  button.textContent = 'Copy';
  button.addEventListener('click', async () => {
    const text = pre.querySelector('code')?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Copy failed';
    }
    window.setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  });
  pre.append(button);
}
