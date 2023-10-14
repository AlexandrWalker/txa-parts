(() => {
  document.addEventListener('DOMContentLoaded', () => {

    $('.product__slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.product__slider-nav'
    });
    $('.product__slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.product__slider-for',
      focusOnSelect: true
    });

    $("[href^='#']").click(function () {
      var idtop = $($(this).attr("href")).offset().top;
      $('html,body').animate(
        { scrollTop: idtop }, 500);
      return false;
    });

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
        burgerBtn.classList.toggle('_active');
        nav.classList.toggle('_active');
      };
    })();

    (function () {
      var obj = document.querySelectorAll(".collection__item");
      var quantity = document.querySelector(".quantity");
      quantity.innerHTML = obj.length;
    })();

  });
})();