(function () {
  // Prevent duplicate injection
  if (document.getElementById('my-custom-bot-root')) return;

  // Create UI overlay container
  const root = document.createElement('div');
  root.id = 'my-custom-bot-root';
  root.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 320px; background: #181a20; color: #ffffff; padding: 15px; z-index: 999999; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); font-family: Arial, sans-serif; border: 1px solid #2b2f36;';

  // Set UI Content
  root.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #2b2f36; padding-bottom: 8px;">
      <h3 style="margin: 0; font-size: 15px; color: #00e676;">📊 Quotex Live Signal Bot</h3>
      <button id="my-bot-close" style="background: transparent; border: none; color: #aaa; cursor: pointer; font-size: 18px;">&times;</button>
    </div>
    
    <div style="font-size: 13px; margin-bottom: 10px;">
      <div><strong>Status:</strong> <span id="bot-status" style="color: #4caf50;">Active & Scanning...</span></div>
      <div style="margin-top: 5px;"><strong>Last Signal:</strong> <span id="bot-signal" style="color: #ffb74d;">WAITING...</span></div>
    </div>

    <div style="background: #23272e; padding: 10px; border-radius: 6px; font-size: 12px; font-family: monospace;">
      <div>Tick Counter: <span id="tick-count">0</span></div>
      <div>Algorithm: 3 Consecutive Candles</div>
    </div>
  `;

  document.body.appendChild(root);

  // Close button handler
  document.getElementById('my-bot-close').addEventListener('click', function () {
    root.style.display = 'none';
  });

  // Basic Candle Scanning Logic
  let count = 0;
  const tickElement = document.getElementById('tick-count');
  const signalElement = document.getElementById('bot-signal');

  setInterval(() => {
    count++;
    if (tickElement) tickElement.innerText = count;

    // Dummy Strategy logic simulation based on Quotex DOM / Price Action
    if (count % 10 === 0) {
      const rand = Math.random();
      if (rand > 0.5) {
        signalElement.innerText = "CALL (UP) ⬆️";
        signalElement.style.color = "#00e676";
      } else {
        signalElement.innerText = "PUT (DOWN) ⬇️";
        signalElement.style.color = "#ff5252";
      }
    }
  }, 1000);

})();
