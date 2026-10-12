(function () {
  // Remove existing overlay if present
  const old = document.getElementById('my-custom-bot-root');
  if (old) old.remove();

  // Create main overlay container
  const root = document.createElement('div');
  root.id = 'my-custom-bot-root';
  root.style.cssText = 'position: fixed; bottom: 25px; right: 25px; width: 330px; background: #131722; color: #ffffff; padding: 16px; z-index: 999999; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); font-family: "Segoe UI", Roboto, sans-serif; border: 1px solid #2a2e39;';

  root.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #2a2e39; padding-bottom: 8px;">
      <h3 style="margin: 0; font-size: 15px; color: #00e676; display: flex; align-items: center; gap: 6px;">
        🤖 Quotex Signal & Timer Bot
      </h3>
      <button id="my-bot-close" style="background: transparent; border: none; color: #888; cursor: pointer; font-size: 18px;">&times;</button>
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

  // Close button event listener
  document.getElementById('my-bot-close').addEventListener('click', () => root.remove());

  // Live clock and candle timer logic
  setInterval(() => {
    const now = new Date();
    const seconds = now.getSeconds();
    const remaining = 60 - seconds;

    const timerElem = document.getElementById('candle-timer');
    const signalElem = document.getElementById('signal-action');
    const hintElem = document.getElementById('entry-hint');

    if (timerElem) {
      const formatted = remaining < 10 ? `00:0${remaining}` : `00:${remaining}`;
      timerElem.innerText = formatted;

      // Color change and entry alert (in the last 5 seconds)
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

    // Generate new signal at the start of each candle (at 00:58/59 seconds)
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
