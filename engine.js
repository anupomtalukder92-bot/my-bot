(function () {
  // Remove existing overlay if present
  const old = document.getElementById('my-custom-bot-root');
  if (old) old.remove();

  // Create main overlay container with draggable support
  const root = document.createElement('div');
  root.id = 'my-custom-bot-root';
  root.style.cssText = 'position: fixed; bottom: 25px; right: 25px; width: 330px; background: #131722; color: #ffffff; padding: 16px; z-index: 999999; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); font-family: "Segoe UI", Roboto, sans-serif; border: 1px solid #2a2e39; user-select: none;';

  root.innerHTML = `
    <div id="bot-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #2a2e39; padding-bottom: 8px; cursor: move;">
      <h3 style="margin: 0; font-size: 15px; color: #00e676; display: flex; align-items: center; gap: 6px;">
        🤖 Quotex Bot
      </h3>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="bot-toggle-btn" style="background: #00e676; color: #131722; border: none; padding: 4px 10px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">STOP</button>
        <button id="my-bot-close" style="background: transparent; border: none; color: #888; cursor: pointer; font-size: 18px;">&times;</button>
      </div>
    </div>

    <!-- Trade Time & Countdown Box -->
    <div style="background: #1e222d; padding: 12px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #2a2e39;">
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
        <span style="color: #aaa;">Trade Duration:</span>
        <strong style="color: #ffeb3b;">1 Minute (M1)</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px;">
        <span style="color: #aaa;">Next Candle In:</span>
        <strong id="candle-timer" style="color: #00bcd4; font-size: 15px; font-family: monospace;">00:60</strong>
      </div>
    </div>

    <!-- Signal Box -->
    <div style="background: #1e222d; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid #2a2e39;">
      <div style="font-size: 12px; color: #aaa; margin-bottom: 4px;">CURRENT SIGNAL</div>
      <div id="signal-action" style="font-size: 20px; font-weight: bold; color: #ffb74d;">WAITING FOR NEW CANDLE...</div>
      <div id="entry-hint" style="font-size: 11px; color: #888; margin-top: 6px;">Wait for 00:02s to enter trade</div>
    </div>
  `;

  document.body.appendChild(root);

  // --- DRAG AND DROP LOGIC ---
  let isDragging = false, offsetX = 0, offsetY = 0;
  const header = document.getElementById('bot-header');

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - root.getBoundingClientRect().left;
    offsetY = e.clientY - root.getBoundingClientRect().top;
    root.style.position = 'fixed';
    root.style.bottom = 'auto';
    root.style.right = 'auto';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    root.style.left = (e.clientX - offsetX) + 'px';
    root.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  // Close button event listener
  document.getElementById('my-bot-close').addEventListener('click', () => root.remove());

  // --- BOT LOGIC & START/STOP ---
  let isRunning = true;
  const toggleBtn = document.getElementById('bot-toggle-btn');
  const timerElem = document.getElementById('candle-timer');
  const signalElem = document.getElementById('signal-action');
  const hintElem = document.getElementById('entry-hint');

  toggleBtn.addEventListener('click', () => {
    isRunning = !isRunning;
    if (isRunning) {
      toggleBtn.innerText = 'STOP';
      toggleBtn.style.background = '#00e676';
      toggleBtn.style.color = '#131722';
    } else {
      toggleBtn.innerText = 'START';
      toggleBtn.style.background = '#ff5252';
      toggleBtn.style.color = '#ffffff';
      if (signalElem) {
        signalElem.innerText = 'BOT STOPPED';
        signalElem.style.color = '#888';
      }
    }
  });

  // Live clock and candle timer logic
  setInterval(() => {
    if (!isRunning) return;

    const now = new Date();
    const seconds = now.getSeconds();
    const remaining = 60 - seconds;

    if (timerElem) {
      const formatted = remaining < 10 ? `00:0${remaining}` : `00:${remaining}`;
      timerElem.innerText = formatted;

      if (remaining <= 5) {
        timerElem.style.color = '#ff5252';
        hintElem.style.color = '#00e676';
        hintElem.innerText = '⚡ PREPARE FOR ENTRY NOW!';
      } else {
        timerElem.style.color = '#00bcd4';
        hintElem.style.color = '#888';
        hintElem.innerText = 'Wait for 00:02s to enter trade';
      }
    }

    if (seconds === 58) {
      const isCall = Math.random() > 0.5;
      if (signalElem) {
        if (isCall) {
          signalElem.innerText = 'CALL (UP) ⬆️';
          signalElem.style.color = '#00e676';
        } else {
          signalElem.innerText = 'PUT (DOWN) ⬇️';
          signalElem.style.color = '#ff5252';
        }
      }
    }
  }, 1000);
})();
