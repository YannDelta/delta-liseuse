// Les fichiers du dépôt sont la source des planches courantes.
// Les indicateurs éditoriaux de data.js ne décident pas de leur disponibilité.
window.DeltaImages = (() => {
  let revision = Date.now();
  const requests = new WeakMap();
  function reset(pages) {
    revision = Math.max(Date.now(), revision + 1);
    for (const page of pages) {
      page.image = `images/P${String(page.number).padStart(2, '0')}-selection.jpg?v=${revision}`;
      page.hasImage = false;
      page.imageAvailable = null;
    }
  }
  function load(img, page, settled, placeholder) {
    const url = page.image;
    const request = {};
    requests.set(img, request);
    const finish = available => {
      if (requests.get(img) !== request || page.image !== url) return;
      img.onload = img.onerror = null;
      const changed = page.imageAvailable !== available;
      page.imageAvailable = available;
      page.hasImage = available;
      if (!available) img.src = placeholder(page.number);
      if (changed) settled(page);
    };
    img.onload = () => finish(img.naturalWidth > 0 && img.naturalHeight > 0);
    img.onerror = () => finish(false);
    img.src = url;
  }
  return {reset, load};
})();
