(() => {
  document.addEventListener('DOMContentLoaded', () => {

    /* Пагинация */
    function paginationItem() {
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
    };

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

    var heroSlider = new Swiper(".hero-slider", {
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

    var swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      thumbs: {
        swiper: swiper,
      },
    });

    $("[href^='#']").click(function () {
      var idtop = $($(this).attr("href")).offset().top;
      $('html,body').animate(
        { scrollTop: idtop }, 500);
      return false;
    });













    (function () {
      var collectionLink = document.querySelectorAll('.collection__link'),
        open = document.getElementsByClassName('open'),
        productName = document.querySelectorAll('product__name'),
        productDesc = document.getElementById('product__desc');

      Array.from(collectionLink).forEach(function (itemLink, i, collectionLink) {
        itemLink.addEventListener('click', function (e) {
          if (open.length > 0 && open[0] !== this)
            open[0].classList.remove('open');

          this.classList.toggle('open');

          var value_one = $('.field_one').val(); /*Берем значение из поля_1*/
          var click_one = 1; /*Счетчик*/

          localStorage.setItem("value_ls", this.val()); /*Заносим значение поля_1 в хранилище*/
          localStorage.setItem("value_click", click_one); /*Заносим значение счетчика в хранилище*/

          document.location.href = '../product.html'; /*переходим на страницу, где будем получать переданное значение*/

          // var attribute = this.getAttribute('name');

          // console.log(attribute);

          // productName.textContent = attribute;

        });

        var value_two = localStorage.getItem("value_ls"); /*Получаем значение поля_1 из хранилища*/
        var click_two = localStorage.getItem("value_click"); /*Получаем значение счетчика из хранилища*/

        if (click_two == 1) { /*Проверяем значение счетчика. Если был клик, а значит, поле передалось не пустое, то...*/
          $('.field_two').val(value_two); /*Заносим значение поля_1*/
          localStorage.removeItem("value_ls"); /*Удаляем контейнер, где хранилось значение поля_1*/
          localStorage.removeItem("value_click"); /*Удаляем контейнер, где хранилось значение счетчика*/
          localStorage.clear(); /*Очищаем хранилище*/
        } else { } /*...Если не было клика, то ничего не происходит*/

      });
    })();
























    (function () {
      var obj = document.querySelectorAll(".collection__item");
      var quantity = document.querySelector(".quantity");
      quantity.innerHTML = obj.length;
    })();

    paginationItem();

  });
})();