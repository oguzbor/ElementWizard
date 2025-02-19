document.addEventListener('click', function (event) {
  const element = event.target;
  const attributes = {
    xpath: getXPath(element),
    class: element.className,
    id: element.id,
    uniq_id: element.getAttribute('data-uniq-id')
  };
  alert(JSON.stringify(attributes, null, 2));
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