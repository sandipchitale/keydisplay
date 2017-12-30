// Handle click on page action
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: `
    (function(){
        var keyDisplayDiv = document.querySelector('#__keydisplay__');
        if (keyDisplayDiv) {
            keyDisplayDiv.parentNode.removeChild(keyDisplayDiv);
            document.removeEventListener('keyup', document.__keydisplay__, false);
            return;
        }
        keyDisplayDiv = document.createElement('div');
        keyDisplayDiv.id = '__keydisplay__';
        keyDisplayDiv.style = 'position: fixed;'
                            + 'height: 50px;'
                            + 'left: 0;'
                            + 'bottom: 0;'
                            + 'right: 0;'
                            + 'z-index: 10000;'
                            + 'background-color: rgba(0,0,0,0.7);'
                            + 'color: white;'
                            + 'font-size: 36px;'
                            + 'font-family: monospace;'
                            + 'text-align: center;'
                            + 'overflow: hidden;'
                            + 'padding: auto auto;'
                            + 'user-select: none;';
        document.body.appendChild(keyDisplayDiv);
        document.__keydisplay__ = function(event) {
            if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt' && event.key !== 'Meta') {
                let keyString = '';
                if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey || (event.key && event.key.length > 1)) {
                    if (event.ctrlKey) keyString += 'Ctrl+';
                    if (event.altKey) keyString += 'Alt+';
                    if (event.shiftKey) keyString += 'Shift+';
                    if (event.metaKey) keyString += 'Meta+';
                    keyString += event.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '');
                }
                keyDisplayDiv.innerText = keyString;

            }
        };
        document.addEventListener('keyup', document.__keydisplay__, false);
    })();
    `
  });
});
