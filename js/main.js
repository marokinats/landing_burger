// One page scroll (OPS)
$(function(){

	var sections = $('.section');
	var display = $('.maincontent');
	var inScroll = false;

	var scrollToSection = function (sectionEq) {
		var position = 0;

		if (!inScroll) {

			inScroll = true;
			
			position = (sections.eq(sectionEq).index() * -100) + '%';
		
			sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

			display.css({
				'transform' : 'translate3d(0, ' + position + ', 0)'
			});

			setTimeout(function () {
				inScroll = false;

				$('.side-menu__item').eq(sectionEq).addClass('active')
					.siblings().removeClass('active'); //Настраиваем фиксированное боковое меню
			}, 1000)
		}
	}

	$('.wrapper').on('wheel', function (e) {
		 
		 var deltaY = e.originalEvent.deltaY; //Получаем координату по Y при скролле 
		 var nextSection = sections.filter('.active').next(); //Получаем секцию следующую за секцией с классом .active
		 var prevSection = sections.filter('.active').prev(); //Получаем секцию предыдущую секции с классом .active

		 if (deltaY > 0) { //Скроллим вниз

		 	if (nextSection.length) { //Проверяем, существует ли секция
		 		scrollToSection(nextSection.index());
		 	}
		 }
	
		 if (deltaY < 0) { //Скроллим вверх
		 	
		 	if (prevSection.length) { //Проверяем, существует ли секция
		 		scrollToSection(prevSection.index());
		 	}
		 }

	});

	$('.hello__down').on('click', function (e) {
		e.preventDefault();

		scrollToSection(1);
	});

	$('.side-menu__link, .header__link').on('click', function (e) {
		e.preventDefault();

		var href = parseInt($(this).attr('href'));

		scrollToSection(href);
	});

	$(document).on('keydown', function (e) {
		
		var nextSection = sections.filter('.active').next();
		var prevSection = sections.filter('.active').prev();

		if (e.keyCode == 40) { //Листаем вниз
			if (nextSection.length) { //Проверяем, существует ли секция
		 		scrollToSection(nextSection.index());
		 	}
		}

		if (e.keyCode == 38) { //Листаем вверх
			if (prevSection.length) { //Проверяем, существует ли секция
		 		scrollToSection(prevSection.index());
		 	}
		}
	});

});

//Slider
$(function () {
	
	var burgerCarousel = $('.products__list').owlCarousel({
		items : 1,
		loop : true,

	});

	$('.products__next').on('click', function (e) {
		e.preventDefault();
		burgerCarousel.trigger('next.owl.carousel', [500]);
	});

	$('.products__prev').on('click', function (e) {
		e.preventDefault();
		burgerCarousel.trigger('prev.owl.carousel', [500]);
	});
});


//Vertical accordeon

$('.crew__link').on('click', function (e) {
	e.preventDefault();

	var $this = $(this);
	var item = $this.closest('.crew__item');
	var list = $this.closest('.crew__list');
	var items = list.find('.crew__item');
	var content = item.find('.crew__content');
	var otherContent = list.find('.crew__content');

	if (!item.hasClass('active')) { //Если нет класса active
		
		items.removeClass('active');
		item.addClass('active');
		otherContent.slideUp(); //Остальной контент закрывается
		content.slideDown(); //Контент открывается
	} else {
		
		item.removeClass('active');
		content.slideUp(); //Контент закрывается
	}
	
});

//Horisontal accordeon

$(function () {
	$('.menu__link').on('click', function (e) {
		e.preventDefault();

		var $this = $(this);
		var item = $this.closest('.menu__item');
		var list = $this.closest('.menu__list');
		var items = list.find('.menu__item');
		var activeItem = items.filter('.active');
		var content = item.find('.menu__content');
		var activeContent = activeItem.find('.menu__content');

		if (!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');

			activeContent.animate({
				'width' : '0px'
			});

			content.animate({
				'width' : '550px'
			});
		} else {
			item.removeClass('active');
			content.animate({
				'width' : '0px'
			});
		}

	});

	$(document).on('click', function (e) {
		var $this = $(e.target);

		if (!$this.closest('.menu__list').length) {
			$('.menu__content').animate({
				'width' : '0px'
			});

			$('menu__item').removeClass('active');
		}

	});

});

//Input mask

$(function () {
	$('.phone-mask').inputmask('+7 (999) 999 99 99');
});


//FancyBox
$(function () {
	$('.reviews__content-btn').fancybox({
		'type' : 'inline',
		'maxWidth' : '460px',
		'fitToView' : 'false',
		'padding' : '0'
	})

	$('.full-review__close').on('click', function (e) {
		e.preventDefault();

		$.fancybox.close();
	})
});

//Form submit

$(function () {
	$('.order__form').on('submit', function (e) {
		e.preventDefault();

		var form = $(this);
		var formData = form.serialize(); //Формирует GETстроку для запроса

		$.ajax({
			url: '../mail.php',
			type: 'POST',
			data: formData, //Передаем полученные из формы данные на сервер
			success: function (data) { // Функция выполнится, если запрос пройдет успешно
			
				var popup = data.status ? '#success' : '#error';
				
				$.fancybox.open([ //Открытие всплывающего уведомления
					{ href: popup }
				], {
					type: 'inline',
					//maxWidth : 250,
					//fitToView : false,
					//padding : 0,
					afterClose : function () { //Cb после закрытия всплывающего окна
						form.trigger('reset'); //Очистка формы
					}
				});
			}
		})

	});

	$('.status-popup__close').on('click', function (e) {//Закрытие всплывающего уведомления
		e.preventDefault();
		$.fancybox.close();
	});
});


//Yandex map

$(function () {
	ymaps.ready(init);
    var myMap;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [59.91817154482064,30.30557799999997],
            zoom: 12,
            controls: []
        });

        //Добавляем указатели(метки) на карту

        var coords = [
        	[59.94554327989287,30.38935262114668],
					[59.91142323563909,30.50024587065841],
					[59.88693161784606,30.319658102103713],
					[59.97033574821672,30.315194906302924],
        ];

        var myCollection = new ymaps.GeoObjectCollection({}, {
       		draggable: false, // метки нельзя перемещать
       		iconLayout: 'default#image',
        	iconImageHref: '../img/icons/map-marker.svg',
        	iconImageSize: [46, 57],
        	iconImageOffset: [-26, -52]
    		});

    		for (var i = 0; i < coords.length; i++) {
    			myCollection.add(new ymaps.Placemark(coords[i]));
    		};

    		myMap.geoObjects.add(myCollection);

        // Отключаем перетаскивание карты мышью.
				myMap.behaviors.disable('scrollZoom');
    }

});
