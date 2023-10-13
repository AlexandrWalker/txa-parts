(() => {
  document.addEventListener('DOMContentLoaded', () => {

    /* Пагинация */
    const content = document.querySelector('.collection__list');
    const itemsPerPage = 16;
    let currentPage = 0;
    const items = Array.from(content.getElementsByTagName('li')).slice(0);

    function showPage(page) {
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      items.forEach((item, index) => {
        item.classList.toggle('hidden', index < startIndex || index >= endIndex);
      });
      updateActiveButtonStates();
    };

    function createPageButtons() {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      const paginationContainer = document.createElement('div');
      const paginationDiv = document.body.appendChild(paginationContainer);
      paginationContainer.classList.add('pagination');

      for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('a');
        pageButton.textContent = i + 1;
        pageButton.setAttribute("href", "#collection__inner");
        pageButton.addEventListener('click', () => {
          currentPage = i;
          showPage(currentPage);
          updateActiveButtonStates();
        });

        content.appendChild(paginationContainer);
        paginationDiv.appendChild(pageButton);
      }
    };

    function updateActiveButtonStates() {
      const pageButtons = document.querySelectorAll('.pagination a');
      pageButtons.forEach((button, index) => {
        if (index === currentPage) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    };

    createPageButtons();
    showPage(currentPage);

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
        navActive = document.getElementsByClassName('active');

      Array.from(navBtn).forEach(function (item, i, navBtn) {
        item.addEventListener('click', function (e) {
          if (navActive.length > 0 && navActive[0] !== this)
            navActive[0].classList.remove('active');

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