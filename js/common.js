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

	const width = window.innerWidth;
	// if (width >= 480){
	// 	new Swiper(".header--services", {
	// 		slidesPerView: 9,
	// 		spaceBetween: 50,
	// 		breakpoints: {
	// 			480: {
	// 				slidesPerView: "auto",
	// 				spaceBetween: 20,
	// 			},
	// 			830: {
	// 				slidesPerView: "auto",
	// 				spaceBetween: 30,
	// 			},
	// 			1024: {
	// 				slidesPerView: "auto",
	// 				spaceBetween: 15,
	// 			},
	// 			1200: {
	// 				spaceBetween: 10,
	// 				slidesPerView: 9,
	// 			},
	// 			1280: {
	// 				spaceBetween: 25,
	// 				slidesPerView: 9,
	// 			},
	// 			1300: {
	// 				spaceBetween: 5,
	// 				slidesPerView: 9,
	// 			},
	// 			1440: {
	// 				spaceBetween: 50,
	// 				slidesPerView: 9,
	// 			},
	// 		},
	// 	});
	// }

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