(function () {
  var allLinks = document.querySelectorAll('.toc-link');
  if (!allLinks.length) return;

  var sections = [];
  allLinks.forEach(function (l) {
    var sec = document.querySelector(l.getAttribute('href'));
    if (sec && sections.indexOf(sec) === -1) sections.push(sec);
  });

  allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      var offset = 20;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });

      if (history.pushState) {
        history.pushState(null, '', link.getAttribute('href'));
      }
    });
  });

  function onScroll() {
    var pos = window.scrollY + 120;
    var current = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= pos) current = i;
    }
    allLinks.forEach(function (l) {
      var target = l.getAttribute('href');
      var isActive = sections[current] && ('#' + sections[current].id) === target;
      l.classList.toggle('active', isActive);
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  onScroll();
})();
