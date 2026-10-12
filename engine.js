(function() {
    // Prevent duplicate injection
    if (document.getElementById('my-custom-bot-root')) return;

    // Create the overlay container
    const root = document.createElement('div');
    root.id = 'my-custom-bot-root';
    root.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 300px; background: #1e1e1e; color: #ffffff; padding: 15px; z-index: 999999; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.4); font-family: Arial, sans-serif;';
    
    // Set UI HTML content
    root.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3 style="margin: 0; font-size: 16px;">My Custom Bot</h3>
            <button id="my-bot-close" style="background: transparent; border: none; color: #fff; cursor: pointer; font-size: 18px; font-weight: bold;">&times;</button>
        </div>
        <div style="font-size: 14px; color: #4caf50;">Bot loaded successfully!</div>
    `;

    document.body.appendChild(root);

    // Close button handler
    document.getElementById('my-bot-close').addEventListener('click', function() {
        root.style.display = 'none';
    });
})();
