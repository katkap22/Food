/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';                     // 4 псевдо пробела (то есть это значение не рассчитывается)
            return;                                          // используется для того чтобы досрочно прервать исполнение функции
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');    
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function getDynamicInformantion(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;        
            }
            calcTotal();
        });
    }

    getDynamicInformantion('#height');
    getDynamicInformantion('#weight');
    getDynamicInformantion('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Получение карточек меню с сервера

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element =  document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);    
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день
                    </div>
                </div>                
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); 

    // axios.get('http://localhost:3000/menu') //не смотря на подчеркивание все должно работать, потому что эта переменная идет из другого скриптового файла
        // .then(data => {
                // data.data.forEach(({img, altimg, title, descr, price}) => {
                    // new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                // });
        // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerID) {
    // Forms Способ получения данных из сервера и вставки на страницу (если это нужно толко однажды и не будет изменяться в дальнейшем)
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    //     function createCard(data) {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             const element = document.createElement('div');
    //             const transfer = 27;
    //             price *= transfer;
    //             element.classList.add('menu__item');

    //             element.innerHTML = `
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день
    //                     </div>
    //                 </div>    
    //             `;
    //             document.querySelector('.menu .container').append(element);
    //         });
    //     } 

    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',//, //что бы использовать картинки надо просто указать к ним путь, если сообщение, то прописать его
        success: 'Спасибо! Мы скоро свяжемся с вами',
        failure: 'Что-то пошло не так...',
    };

    // подвязываем под каждую форму функцию bindPostData
    forms.forEach(item => {
        bindPostData(item);
    });

    // функция, кот обрабатывает полученные от сервера данные (т.е. отвечает за привязку постинга данных)
    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяем станд поведение браузера (перезагрузку страницы)

            const statusMessage = document.createElement('img'); // Создаем нов эл, для сообщения пользователю (напр div или img)
            statusMessage.src=message.loading; // добавляем класс или атрибут src (можно напрямую или через setAttribute('src'))
            statusMessage.textContent = message.loading; // Передаем сообщение, если у нас текстовое сообщение (см объект message) 
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;                            // Добавляем стили (если у нас картинка) Можно их перенести в CSS и просто добавлять класс
            form.insertAdjacentElement('afterend', statusMessage); // добавляем на страницу в конец нашей формы

            const formData = new FormData(form); // самый простой способ отправки данных с помощью объекта FormData

            const json = JSON.stringify(Object.fromEntries(formData.entries()));   // сначала из formData получаем массив массивов, затем объект, затем его в формат json 

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)  // модифицируем данные из объекта в JSON формат
            .then(data => {
                console.log(data);
                showThanksModal(message.success); // сообщение об успешном запросе в нов модальном окне
                statusMessage.remove();           // удаление спинера с результатом загрузки
            })
            .catch(() => {
                showThanksModal(message.failure); // сообщение об ошибке в новом модальном окне (в состояние reject не переходят ошибки http 404 или 500...)
            })
            .finally(() => {
                form.reset();                     // очистка формы
            });
        });
    }
 
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // получаем предыдущий диалог из уже имеющегося мод окна

        prevModalDialog.classList.add('hide');                       // скрываем его
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerID);

        const thanksModal = document.createElement('div');         // создаем нов элемент взамен скрытого
        thanksModal.classList.add('modal__dialog');                // присваиваем ему тот же класс, что был у скрытого элемента
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close> &times; </div>
                <div class='modal__title'>${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    
    const  modalTriggger = document.querySelectorAll(triggerSelector),
           modal = document.querySelector(modalSelector);
        //    modalCloseBtn = document.querySelector('[data-close]'); // Не нужен крестик, потому что есть динамически созданный элемент       
    
    modalTriggger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID)); // колбэк ф-ия так прописывается, если у ф-ции есть аргументы
    });
    
    // modalCloseBtn.addEventListener('click', closeModal); //Закрытие окна крестиком, убираем т.к. это не работает при динамическом добавлении другого мод окна

    modal.addEventListener('click', (e) => {             // Закрытие она кликом на пустую область + кликом на крестик 
         if (e.target === modal || e.target.getAttribute('data-close') === '' ) {
            closeModal(modalSelector);
         }
    });

    document.addEventListener('keydown', (e) => {           // Закрытие окна нажатием на ESCAPE
          if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
          }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const slides = document.querySelectorAll(slide),  // массив из картинок
          slider = document.querySelector(container),    // весь элемент слайдера
          prev = document.querySelector(prevArrow), // стрелка влево
          next = document.querySelector(nextArrow), // стрелка вправо
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper), // внешняя обертка слайдов
          slidesField = document.querySelector(field),     // внутренняя обертка слайдов
          width = window.getComputedStyle(slidesWrapper).width;  // получаем стили примененные компьютером в виде строки, напр '500px'

    let slideIndex = 1;
    let offset = 0;           // сдвиг
    
    setCurrent();
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%'; // устанавливаем ширину блоку со слайдами в процентах
    slidesField.style.display = 'flex';                  // делаем из этого блока флекс контейнер
    slidesField.style.transition = '0.5s all';           // делаем CSS - переход, длительностью 0,5сек

    slidesWrapper.style.overflow = 'hidden';             // скрываем лишние слайды, т.е. все что выходит за пределы внешнего блока

    slides.forEach(slide => {                            // устанавливаем ширину для каждого слайда по ширине внешнего блока (на случай если у них разная ширина)
        slide.style.width = width;
    });

    slider.style.position = 'relative';                  // для того, чтобы относительно этого блока расположить точки

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');     // если добавляем класс, то стили прописываем в style.css/ если не добавляем, то можно в js
    indicators.style.cssText = `                        
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {                     // с помощью цикла создаем точки навигации в количестве равном кол-ву слайдов
        const dot = document.createElement('li');                 // и прописываем для них стили
        dot.setAttribute('data-slide-to', i + 1);                 // устанавливаем нумерацию точек начиная с 1
        dot.style.cssText = `           
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {                                             // устанавливаем полную непрозрачность для первой точки
            dot.style.opacity = 1;
        }
        indicators.append(dot);                                  // помещаем точку в список ol
        dots.push(dot);                                          // и помещаем точку в массив, который можно в дальнейшем использовать
    }

    function deletNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', ()=> {
        if (offset == deletNotDigits(width) * (slides.length -1)) {        //'500px' - все не числа заменяем на ''
            offset = 0;
        } else {
           offset += deletNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;                       // сдвигаем блок влево

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrent();
        setActiveDot();
    });

    prev.addEventListener('click', ()=> {
        if (offset == 0) {        
            offset = deletNotDigits(width) * (slides.length -1);  //'500px' - переводим в число и убираем 2 посл символа
        } else {
           offset -= deletNotDigits(width);                       
        }

        slidesField.style.transform = `translateX(-${offset}px)`;             // сдвигаем блок вправо 

        if (slideIndex == 1) {
            slideIndex =slides.length;
        } else {
            slideIndex--;
        }

        setCurrent();
        setActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');    // получаем в переменную номер точки по которой кликнули

            slideIndex = slideTo;                                      // slideIndex переводим в позицию slideTo
            offset = deletNotDigits(width) * (slideTo -1); // устанавливаем величину сдвига 

            slidesField.style.transform = `translateX(-${offset}px)`;  // сдвигаем слайды на установленную величину

            setCurrent();   
            setActiveDot();
        });
    });

    function setCurrent() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;          // присваиваем элементу текущего слайда значение slideIndex
        } else {
            current.textContent = slideIndex;
        }
    }

    function setActiveDot() {                                // активную точку делаем непрозрачной
        dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsParentSelector, tabsContentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
    tabsParent = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);

    // функция для скрытия всех табов 
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    //Задаем параметры по умолчаниюе: все табы скрыты, кроме 1го
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    //Timer

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),//округление до цел числа-млсек-ы итог делим на млсек в 1х сут
            hours = Math.floor((t / (1000 * 60 * 60)) % 24), 
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t /1000) % 60);

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        //    'total': t,
        //    'days' : days,
        //    'hours' : hours, 
        //    'minutes' : minutes,
        //    'seconds' : seconds,
        };     
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
           return `0${num}`;
        } else  {
           return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
   
            if (t.total <= 0) {
               clearInterval(timeInterval);
               days.innerHTML = getZero(0);
               hours.innerHTML = getZero(0);
               minutes.innerHTML = getZero(0);
               seconds.innerHTML = getZero(0);
            }
        
        }

    }
   
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//  функция, кот отвечает только за отправку данных, ее можно использовать много раз с разными аргументами
const postData = async(url, data) => {            // async - указывает что внутри функции будет какой то асинхронный код
    const res = await fetch(url, {                // await - указывает на то, что операция присваивания должна подождать рез-та запроса   
        method: 'POST',
        headers: {
            'Content-type': 'application/json' // заголовки для формата json
        },
        body: data,
    });

    return await res.json();  // вернет промис модифицированный в объект      await - ждем окончания работы метода json
};

//  функция, кот отвечает только за получение данных с сервера: get запрос
async function getResource(url) {            // async - указывает что внутри функции будет какой то асинхронный код
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Coluld not fetch ${url}, status: ${res.status}`);   // выкидываем новую ошибку (если сервер вернет 400 или 500)
    }
    return await res.json();                     // вернет промис модифицированный в объект      await - ждем окончания работы метода json
};

    
 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerID = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', modalTimerID), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerID);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTimerID);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container:'.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023-01-01');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map