export function isMobile() {
	const mobiles = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return mobiles.test(navigator.userAgent);
}
//====================================================================================================================
export function menuBurger() {
	const menuIcon = document.querySelector('.menu-icon');
	const menuLinks = document.querySelectorAll('.menu__link');
	const menu = document.querySelector('.menu');
	const body = document.querySelector('body');
	const headerBtn = document.querySelector('.header__btn');
	const wrapper = document.querySelector('.wrapper');
	const wrapperArray = Array.from(wrapper.children);
	const header = document.querySelector('.header');
	const logo = header.querySelector('.header__logo');
	const phones = header.querySelectorAll('.header__phone a');
	// const lockPadding = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	function menuInert() {
		if ((menu.classList.contains('_active') && window.innerWidth < 767.98) || (!menu.classList.contains('_active') && window.innerWidth > 767.98)) {
			menuLinks.forEach(menuLink => {
				menuLink.inert = false;
				menuLink.setAttribute('aria-hidden', 'false');
				menuLink.setAttribute('tabindex', '0');
			});
		} else {
			menuLinks.forEach(menuLink => {
				menuLink.inert = true;
				menuLink.setAttribute('aria-hidden', 'true');
				menuLink.setAttribute('tabindex', '-1');
			});
		}
	}

	function phonesInert(){
		if (window.innerWidth > 479.98) {
			phones.forEach(phone => {
				phone.inert = false;
				phone.setAttribute('aria-hidden', 'false');
				phone.setAttribute('tabindex', '0');
			});
		} else {
			phones.forEach(phone => {
				phone.inert = true;
				phone.setAttribute('aria-hidden', 'true');
				phone.setAttribute('tabindex', '-1');
			});
		}
	}

	phonesInert();
	menuInert();
	if (menuIcon && menu) {
		menuInert();
		menuIcon.addEventListener("click", () => {
			menu.classList.toggle('_active');
			body.classList.toggle('_lock');
			if (menuIcon.classList.toggle('_active')) {
				for (let index = 0; index < wrapperArray.length; index++) {
					const element = wrapperArray[index];
					if (element !== header) {
						element.inert = true;
						element.setAttribute('aria-hidden', 'true');
						element.setAttribute('tabindex', '-1');
					}
				}

				logo.setAttribute('tabindex', '-1');

				phones.forEach(phone => {
					phone.inert = true;
					phone.setAttribute('aria-hidden', 'true');
					phone.setAttribute('tabindex', '-1');
				});

				headerBtn.inert = true;
				headerBtn.setAttribute('aria-hidden', 'true');
				headerBtn.setAttribute('tabindex', '-1');

				setTimeout(() => {
					menuIcon.setAttribute('tabindex', '1');
				}, 300);

				phonesInert();
				menuInert();
			} else {
				for (let index = 0; index < wrapperArray.length; index++) {
					const element = wrapperArray[index];
					if (element !== header) {
						element.inert = false;
						element.setAttribute('aria-hidden', 'false');
						element.setAttribute('tabindex', '0');
					}
				}

				logo.setAttribute('tabindex', '0');

				phones.forEach(phone => {
					phone.inert = false;
					phone.setAttribute('aria-hidden', 'false');
					phone.setAttribute('tabindex', '0');
				});

				headerBtn.inert = false;
				headerBtn.setAttribute('aria-hidden', 'false');
				headerBtn.setAttribute('tabindex', '0');

				phonesInert()
				menuInert();

				setTimeout(() => {
					menuIcon.setAttribute('tabindex', '0');
				}, 300);
			}
		});
	}

	const callback = function(entries, observer){
		if(entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else{
			header.classList.add('_scroll');
		}
	}

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);
}
//=============================================================================================================================================
export function custumSelectFunction() {

	document.querySelectorAll('.dropdown').forEach((dropdownWrapper) => {

		const dropDownBtn = dropdownWrapper.querySelector('.dropdown__btn');
		const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
		const dropdownListItems = dropdownList.querySelectorAll('.dropdown__list-item');
		const dropDownInput = dropdownWrapper.querySelector('.dropdown__input');

		dropDownBtn.addEventListener('click', function () {
			this.classList.toggle('_active');
			dropdownList.classList.toggle('_open');
			dropDownBtn.setAttribute('aria-expanded', 'true');
		});

		dropdownListItems.forEach(listItem => {
			listItem.addEventListener('click', (e) => {
				dropDownBtn.innerText = listItem.dataset.value;
				dropDownBtn.focus();
				dropDownInput.setAttribute('value', listItem.dataset.value);
				dropdownList.classList.remove('_open');
				dropDownBtn.classList.remove('_active');
				dropDownBtn.classList.add('_checked');

				dropdownListItems.forEach(listItem => {
					listItem.setAttribute('aria-selected', 'false');
				});
				listItem.setAttribute('aria-selected', 'true');

				dropDownBtn.setAttribute('aria-expanded', 'false');
				e.stopPropagation();
			});
			listItem.addEventListener('keydown', (e) => {
				if (e.key !== 'Tab') {
					if (dropDownBtn.innerText === listItem.dataset.value) {
						dropDownBtn.classList.add('_checked');
						dropDownBtn.focus();
					}
					dropDownBtn.classList.remove('_active');
					dropdownList.classList.remove('_open');
					dropDownBtn.setAttribute('aria-expanded', 'false');
				}
			});
		});

		document.addEventListener('click', (e) => {
			if (e.target !== dropDownBtn) {
				dropdownList.classList.remove('_open');
				dropDownBtn.classList.remove('_active');
				dropDownBtn.setAttribute('aria-expanded', 'false');
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				dropdownList.classList.remove('_open');
				dropDownBtn.classList.remove('_active');
				dropDownBtn.setAttribute('aria-expanded', 'false');
			}
		});
	});
}
//=============================================================================================================================================
export function validationFormFunction() {
	const selectForm = document.getElementById('select-form');
	const footerForm = document.getElementById('form-footer');

	selectForm.addEventListener('submit', selectFormSend);
	footerForm.addEventListener('submit', footerFormSend);

	function selectFormSend(e) {
		e.preventDefault();
		let selectError = validateForm(selectForm);

		if (selectError !== 0) {
			alert('Заполните обязательные поля!!!');
		}
	}

	function footerFormSend(e) {
		e.preventDefault();
		let footerError = validateForm(footerForm);

		if (footerError !== 0) {
			alert('Заполните обязательные поля!!!');
		}
	}

	function validateForm(form) {
		let error = 0;
		let formReq = form.querySelectorAll('._req');

		formReq.forEach((input) => {
			removeError(input);
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					addError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					addError(input);
					error++;
				}
			}
		});

		return error;
	}

	function addError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function removeError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
}
//=============================================================================================================================================
export function animationFunction() {

	const animItems = document.querySelectorAll('._anim-init');
	if (animItems.length > 0) {

		window.addEventListener('scroll', animOnScroll);
		document.addEventListener('DOMContentLoaded', animOnScroll);

		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffSet = offSet(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (innerHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((scrollY > animItemOffSet - animItemPoint) && scrollY < (animItemOffSet + animItemHeight)) {
					animItem.classList.add('_active');
				} else {
					if (!animItem.classList.contains('_anim-no-hide')) {
						animItem.classList.remove('_active');
					}
				}
			}
		}

		function offSet(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.scrollX || document.documentElement.scrollLeft,
				scrollTop = window.scrollY || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		setTimeout(() => {
			animOnScroll();
		}, 200);

	}
}
