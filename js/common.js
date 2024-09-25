"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const top = document.querySelector('.top');
	const footer = document.querySelector('.footer');
	window.addEventListener('scroll', function() {
		const footerPosition = footer.getBoundingClientRect().top; // Позиция верхней границы футера
		const windowHeight = window.innerHeight; // Высота окна браузера
	
		if (window.scrollY > 500) {
			top.classList.add('scroll');
		} else {
			top.classList.remove('scroll');
		}
	
		// Если футер виден на экране, скрываем кнопку
		if (footerPosition <= windowHeight) {
			top.classList.remove('scroll');
		}
	});
	
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	
	top.addEventListener('click', scrollToTop);

	// Получаем все кнопки и тексты
	const buttons = document.querySelectorAll('.information--info__buttons button');
	const texts = document.querySelectorAll('.information--info__text');

	// Убираем класс 'active' у всех элементов
	function removeActiveClasses() {
		buttons.forEach(button => button.classList.remove('active'));
		texts.forEach(text => {
			text.classList.remove('active');
			text.classList.remove('animate__backInUp')
		});
	}

	// Добавляем класс 'active' первой кнопке и тексту при загрузке страницы
	function setInitialActive() {
		if (buttons.length > 0 && texts.length > 0) {
			buttons[0].classList.add('active');
			texts[0].classList.add('active');
			texts[0].classList.add('animate__backInUp');
		}
	}

	// Добавляем обработчики кликов для каждой кнопки
	buttons.forEach((button, index) => {
		button.addEventListener('click', () => {
			// Удаляем классы 'active' у всех кнопок и текстов
			removeActiveClasses();
			
			// Добавляем класс 'active' для текущей кнопки и текста
			button.classList.add('active');
			texts[index].classList.add('active');
			texts[index].classList.add('animate__backInUp');
		});
	});

	// Устанавливаем активные классы при загрузке страницы
	setInitialActive();

	// Получаем элементы
	const modalOpenButtons = document.querySelectorAll('.modal--open');
	const modalOpenCalculationButtons = document.querySelectorAll('.modal--openCalculation');
	const modals = document.querySelectorAll('.modal');
	const modalSend = document.querySelector('.modal--send');
	const burgerMenu = document.querySelectorAll('.burger');
	const headermenu = document.querySelector('.modal--menu');

	// Функция для открытия модального окна
	function openModal(modal) {
		modal.classList.add('active');
		document.body.classList.add('overflow');
		document.documentElement.classList.add('overflow');
	}

	// Функция для закрытия модального окна
	function closeModals() {
		modals.forEach(modal => modal.classList.remove('active'));
		modalSend.classList.remove('active');
		document.body.classList.remove('overflow');
		document.documentElement.classList.remove('overflow');
	}

	// Открытие модального окна при нажатии на кнопки
	modalOpenButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const modalGeneral = document.querySelector('.modal--general');
			openModal(modalGeneral);
		});
	});

	modalOpenCalculationButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const modalCalculation = document.querySelector('.modal--calculation');
			openModal(modalCalculation);
		});
	});

	// Переключение бургер-меню
	burgerMenu.forEach(open => {
		open.addEventListener('click', () => {
			if (headermenu.classList.contains('open')) {
				headermenu.classList.remove('open');
			} else {
				headermenu.classList.add('open');
			}
		});
	});

	// Закрытие модального окна при нажатии на кнопки закрытия
	document.querySelectorAll('.modal--close').forEach(closeButton => {
		closeButton.addEventListener('click', () => {
			closeModals();
		});
	});

	// Закрытие модального окна при клике вне его содержимого
	document.addEventListener('click', (event) => {
		const target = event.target;
		if (!target.closest('.modal--wrapper') && !target.closest('.modal--open') && !target.closest('.modal--openCalculation')) {
			closeModals();
		}
	});


	const fio = document.querySelectorAll('input[name="fio"]');
	fio.forEach(name =>{
		name.addEventListener('keyup', function() {
			this.value = this.value.replace(/http|https|url|.net|www|.ru|.com|[0-9]/g, '');
		});
	});

	let eventCalllback = function(e) {
		let el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = "+_(___) ___-__-__",
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}
	let phone_inputs = document.querySelectorAll('.wpcf7-tel');
	for (let elem of phone_inputs) {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCalllback);
		}
	}

});