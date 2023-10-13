$(document).ready(function () {

  var native_width = 0;
  var native_height = 0;
  var mouse = { x: 0, y: 0 };
  var magnify;
  var cur_img;

  var ui = {
    magniflier: $('.magniflier')
  };

  // Добавляем в DOM увеличительное стекло
  if (ui.magniflier.length) {
    var div = document.createElement('div');
    div.setAttribute('class', 'glass');
    ui.glass = $(div);

    $('body').append(div);
  }


  // Определяем положение курсора
  var mouseMove = function (e) {

    // Получаем отступы до края картинки слева и сверху
    var magnify_offset = cur_img.offset();

    // Позиция курсора над изображением
    // pageX/pageY - это значения по х и у положения курсора от краев браузера
    mouse.x = e.pageX - magnify_offset.left;
    mouse.y = e.pageY - magnify_offset.top;

    // Увеличительное стекло должно отображаться только когда указатель мыши находится над картинкой
    // При отводе курсора от картинки происходит плавное затухание лупы
    // Поэтому необходимо проверить, не выходит ли за границы картинки положение курсора
    if (
      mouse.x < cur_img.width() &&
      mouse.y < cur_img.height() &&
      mouse.x > 0 &&
      mouse.y > 0
    ) {
      // Если условие истинно переходим дальше
      magnify(e);
    }
    else {
      // иначе скрываем
      ui.glass.fadeOut(100);
    }

    return;
  };

  var magnify = function (e) {

    // Основное изображение будет в качестве фона в блоке div glass
    // поэтому необходимо рассчитать положение фона в этом блоке 
    // относительно положения курсора над картинкой
    //
    // Таким образом мы рассчитываем положение фона
    // и заносим полученные данные в переменную
    // которая будет использоваться в качестве значения
    // свойства background-position

    var rx = Math.round(mouse.x / cur_img.width() * native_width - ui.glass.width() / 2) * -1;
    var ry = Math.round(mouse.y / cur_img.height() * native_height - ui.glass.height() / 2) * -1;
    var bg_pos = rx + "px " + ry + "px";

    // Теперь определим положение самого увеличительного стекла
    // т.е. блока div glass
    // логика простая: половину ширины/высоты лупы вычитаем из 
    // положения курсора на странице

    var glass_left = e.pageX - ui.glass.width() / 2;
    var glass_top = e.pageY - ui.glass.height() / 2;

    // Теперь присваиваем полученные значения css свойствам лупы
    ui.glass.css({
      left: glass_left,
      top: glass_top,
      backgroundPosition: bg_pos
    });

    return;
  };

  // Движение курсора над изображению
  $(ui.magniflier).on('mousemove', function () {
    // Плавное появление лупы
    ui.glass.fadeIn(100);
    // Текущее изображение
    cur_img = $(this);
    // определяем путь до картинки
    var src = cur_img.attr('src');
    // Если существует src, устанавливаем фон для лупы 
    if (src) {
      ui.glass.css({
        'background-image': 'url(' + src + ')',
        'background-repeat': 'no-repeat'
      });
    }

    // Проверяем есть ли запись о первоначальном размере картинки native_width/native_height
    // если нет, значит вычисляем и создаем об этом запись для каждой картинки
    // иначе показываем лупу с увеличенной областью

    if (!cur_img.data('native_width')) {

      // Создаем новый объект изображение, с актуальной идентичный актуальному изображению
      // Это сделано для того чтобы получить реальные размеры изображения 
      // сделать напрямую мы этого не может, так как в атрибуте width указано др значение

      var image_object = new Image();

      image_object.onload = function () {

        // эта функция выполнится только тогда после успешной загрузки изображения
        // а до тех пор пока загружается native_width/native_height равны 0

        // определяем реальные размеры картинки
        native_width = image_object.width;
        native_height = image_object.height;

        // Записываем эти данные
        cur_img.data('native_width', native_width);
        cur_img.data('native_height', native_height);

        // Вызываем функцию mouseMove и происходит показ лупы 
        mouseMove.apply(this, arguments);
        ui.glass.on('mousemove', mouseMove);

      };

      image_object.src = src;

      return;
    } else {
      // получаем реальные размеры изображения  
      native_width = cur_img.data('native_width');
      native_height = cur_img.data('native_height');
    }

    // Вызываем функцию mouseMove и происходит показ лупы
    mouseMove.apply(this, arguments);
    ui.glass.on('mousemove', mouseMove);
  });
})