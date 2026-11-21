(function () {
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var nav = (navigator.language || "en").slice(0, 2);
  var lang = saved || (nav === "ru" || nav === "zh" ? nav : "en");
  function set(l) {
    document.documentElement.lang = l;
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.set === l);
    });
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set]");
    if (b) set(b.dataset.set);
    var c = e.target.closest("[data-copy]");
    if (c && navigator.clipboard) {
      navigator.clipboard.writeText(c.dataset.copy);
      var old = c.innerHTML;
      c.textContent = "✓";
      setTimeout(function () { c.innerHTML = old; }, 1200);
    }
  });
  set(lang);
})();
