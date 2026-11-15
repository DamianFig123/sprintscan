// Language: #pl / #en in the address, else the last choice, else the browser language.
(function () {
  var root = document.documentElement;
  function pick() {
    var h = (location.hash || "").replace("#", "");
    if (h === "pl" || h === "en") return h;
    try { var saved = localStorage.getItem("scansprint-lang"); if (saved === "pl" || saved === "en") return saved; } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("pl") === 0 ? "pl" : "en";
  }
  function apply(lang) {
    root.classList.remove("lang-pl", "lang-en");
    root.classList.add("lang-" + lang);
    root.setAttribute("lang", lang);
    var t = document.querySelector('meta[name="title-' + lang + '"]');
    if (t) document.title = t.content;
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    // Keep the language when moving between pages.
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      a.setAttribute("href", a.getAttribute("data-page") + "#" + lang);
    });
    try { localStorage.setItem("scansprint-lang", lang); } catch (e) {}
  }
  apply(pick());
  window.addEventListener("hashchange", function () { apply(pick()); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set-lang]");
    if (!b) return;
    var lang = b.getAttribute("data-set-lang");
    if (location.hash !== "#" + lang) location.hash = lang; else apply(lang);
  });
})();
