/**
 * Temperature Chart — Accessible Canvas Chart
 * Draws the 24-hour temperature trend line with accessible fallback
 */
const TempChart = {
  canvas: null,
  ctx: null,

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.draw();
    window.addEventListener('resize', () => this.draw());
  },

  draw() {
    const data = WeatherData.hourlyForecast;
    const displayCount = 9; // Show 12PM to 8AM
    const points = data.slice(0, displayCount);
    const canvas = this.canvas;
    const ctx = this.ctx;

    // Set canvas size
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    const temps = points.map(p => p.temp);
    const minT = Math.min(...temps) - 3;
    const maxT = Math.max(...temps) + 3;

    const padLeft = 20;
    const padRight = 20;
    const padTop = 30;
    const padBottom = 40;
    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBottom;

    const getX = (i) => padLeft + (i / (points.length - 1)) * chartW;
    const getY = (t) => padTop + chartH - ((t - minT) / (maxT - minT)) * chartH;

    // Grid line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop + chartH);
    ctx.lineTo(padLeft + chartW, padTop + chartH);
    ctx.stroke();

    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = '#5D5FEF';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    for (let i = 0; i < points.length; i++) {
      const x = getX(i);
      const y = getY(points[i].temp);
      if (i === 0) ctx.moveTo(x, y);
      else {
        // Smooth curve
        const prevX = getX(i - 1);
        const prevY = getY(points[i - 1].temp);
        const cpx = (prevX + x) / 2;
        ctx.bezierCurveTo(cpx, prevY, cpx, y, x, y);
      }
    }
    ctx.stroke();

    // Gradient fill under line
    const gradient = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    gradient.addColorStop(0, 'rgba(93, 95, 239, 0.08)');
    gradient.addColorStop(1, 'rgba(93, 95, 239, 0)');

    ctx.lineTo(getX(points.length - 1), padTop + chartH);
    ctx.lineTo(getX(0), padTop + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Highlight max point
    const maxIdx = temps.indexOf(Math.max(...temps));
    const maxX = getX(maxIdx);
    const maxY = getY(temps[maxIdx]);

    ctx.beginPath();
    ctx.arc(maxX, maxY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#5D5FEF';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(maxX, maxY, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#5D5FEF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Max temp label
    ctx.fillStyle = '#191C1E';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${temps[maxIdx]}°`, maxX, maxY - 14);

    // Time labels
    const timeLabels = ['12 PM', '4 PM', '8 PM', '12 AM', '4 AM', '8 AM'];
    const labelIndices = [0, 2, 4, 6, 7, 8];
    ctx.fillStyle = '#464555';
    ctx.font = '400 13px Inter, sans-serif';
    ctx.textAlign = 'center';

    labelIndices.forEach((idx, li) => {
      if (idx < points.length) {
        ctx.fillText(timeLabels[li], getX(idx), padTop + chartH + 24);
      }
    });
  }
};

/**
 * Weekly Trends Bar Chart (for forecast page)
 */
const TrendsChart = {
  init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.draw(canvas, ctx);
    window.addEventListener('resize', () => this.draw(canvas, ctx));
  },

  draw(canvas, ctx) {
    const data = WeatherData.detailedForecast.weeklyTrends;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    const padLeft = 10;
    const padRight = 10;
    const padTop = 10;
    const padBottom = 30;
    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBottom;
    const barW = chartW / data.labels.length;

    // Draw bars
    data.precipitation.forEach((val, i) => {
      const barH = (val / 100) * chartH;
      const x = padLeft + i * barW + barW * 0.2;
      const w = barW * 0.6;
      const y = padTop + chartH - barH;

      ctx.fillStyle = 'rgba(93, 95, 239, 0.2)';
      ctx.beginPath();
      ctx.roundRect(x, y, w, barH, [4, 4, 0, 0]);
      ctx.fill();
    });

    // Labels
    ctx.fillStyle = '#64748B';
    ctx.font = '400 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    data.labels.forEach((label, i) => {
      ctx.fillText(label, padLeft + i * barW + barW / 2, padTop + chartH + 20);
    });
  }
};

window.TempChart = TempChart;
window.TrendsChart = TrendsChart;
