(() => {
  document.addEventListener('DOMContentLoaded', () => {

    var swiper = new Swiper(".hero-slider", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    (function () {
      var navBtn = document.querySelectorAll('.nav__btn'),
        active = document.getElementsByClassName('active');

      Array.from(navBtn).forEach(function (item, i, navBtn) {
        item.addEventListener('click', function (e) {
          if (active.length > 0 && active[0] !== this)
            active[0].classList.remove('active');

          this.classList.toggle('active');
        });
      });
    })();

    (function () {
      let burgerBtn = document.getElementById('burger');
      let nav = document.getElementById('nav');

      burgerBtn.onclick = function () {
        burgerBtn.classList.toggle('active');
        nav.classList.toggle('active');
      };
    })();

    (function () {
      var obj = document.querySelectorAll(".collection__item");
      var quantity = document.querySelector(".quantity");
      quantity.innerHTML = obj.length;
    })();

  });
})();