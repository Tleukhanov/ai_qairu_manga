(function () {
  "use strict";

  var bar = document.getElementById("progress");
  var pages = Array.prototype.slice.call(document.querySelectorAll(".page"));

  function updateProgress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var y = window.scrollY || doc.scrollTop;
    var ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    bar.style.width = (ratio * 100).toFixed(1) + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  function currentPage() {
    var mid = window.scrollY + window.innerHeight * 0.4;
    var idx = 0;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].offsetTop <= mid) idx = i;
    }
    return idx;
  }

  function goTo(index) {
    if (index < 0 || index >= pages.length) return;
    pages[index].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var key = e.key;

    if (key === "ArrowRight" || key === "ArrowDown" || key === " " || key === "PageDown") {
      e.preventDefault();
      goTo(Math.min(pages.length - 1, currentPage() + 1));
    } else if (key === "ArrowLeft" || key === "ArrowUp" || key === "PageUp") {
      e.preventDefault();
      goTo(Math.max(0, currentPage() - 1));
    } else if (key === "Home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (key === "End") {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  });
})();
