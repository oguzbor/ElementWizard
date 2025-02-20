document.getElementById('inspectButton').addEventListener('click', () => {
  chrome.scripting.executeScript({
    target: { allFrames: true },
    func: () => {
      document.addEventListener('click', function (event) {
        const element = event.target;
        const attributes = {
          xpath: getXPath(element),
          class: element.className,
          id: element.id,
          uniq_id: element.getAttribute('data-uniq-id')
        };
        showPopup(attributes);
      }, true);

      function getXPath(element) {
        if (element.id !== '') {
          return 'id("' + element.id + '")';
        }
        if (element === document.body) {
          return element.tagName;
        }

        let ix = 0;
        let siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
          let sibling = siblings[i];
          if (sibling === element) {
            return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
          }
          if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            ix++;
          }
        }
      }

      function showPopup(attributes) {
        let popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.bottom = '10px';
        popup.style.right = '10px';
        popup.style.padding = '10px';
        popup.style.backgroundColor = 'white';
        popup.style.border = '1px solid black';
        popup.style.zIndex = '10000';
        popup.innerHTML = `
          <strong>Element Attributes:</strong>
          <pre>${JSON.stringify(attributes, null, 2)}</pre>
          <button id="closePopup">Close</button>
        `;
        document.body.appendChild(popup);
        document.getElementById('closePopup').addEventListener('click', () => {
          document.body.removeChild(popup);
        });
      }
    }
  });
});