// Equivalent to src/routes/cat_encryption/matrixBG.ts

export function matrixDisplay() {
  const c = document.getElementById('matrixCanvas') as HTMLCanvasElement;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;

  c.height = window.innerHeight;
  c.width = window.innerWidth;

  let matrix: string | string[] =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
  matrix = matrix.split('');

  const font_size = 10;
  const columns = c.width / font_size;
  const drops: number[] = [];
  for (let x = 0; x < columns; x++) drops[x] = 1;

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = font_size + 'px arial';

    for (let i = 0; i < drops.length; i++) {
      const text = (matrix as string[])[Math.floor(Math.random() * (matrix as string[]).length)];
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 35);
}
