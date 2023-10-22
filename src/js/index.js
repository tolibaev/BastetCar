"use strict";

import * as functions from "./modules/functions.js";
functions.isMobile();
functions.menuBurger();
functions.custumSelectFunction();
functions.validationFormFunction();
functions.animationFunction();

import { inertFunction } from "./modules/inert.js";
inertFunction();

import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
useDynamicAdapt();

import { phoneMaskFunction } from "./modules/phoneMask.js";
phoneMaskFunction();

import { PopupFunction } from "./modules/popups.js";
PopupFunction();

// import { spollersInit } from "./modules/spollers.js";
// spollersInit();

//=============================================================================================================================================

import Swiper from 'swiper';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
new Swiper('.swiper', {
	modules: [Autoplay, Pagination, EffectCoverflow ],
	navigation: {
		nextEl: '.result__arrow--next',
		prevEl: '.result__arrow--prev',
	},
	// autoplay: {
	// 	delay: 1500,
	// 	disableOnInteraction: false,
	// },
	loop: true,
	speed: 1000,
	autoHeight: true,
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 443.8,
		modifier: 1,
		slideShadows: false,
	},
	pagination: {
		el: ".slider__pagination",
		clickable: true,
	},
	// breakpoints: {
	// 	991.98: {
	// 		slidesPerView: 3,
	// 		spaceBetween: 33,
	// 	},
	// 	767.98: {
	// 		slidesPerView: 2,
	// 		spaceBetween: 20,
	// 	},
	// },
});
//=============================================================================================================================================



