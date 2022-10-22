window.addEventListener('DOMContentLoaded', () => {
    
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    // функция для скрытия всех табов 
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
           item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    //Задаем параметры по умолчаниюе: все табы скрыты, кроме 1го
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                   hideTabContent();
                   showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadLine = '2022-08-03T20:15:30';

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
   
    setClock('.timer', deadLine);

    // Modal

    const  modalTriggger = document.querySelectorAll('[data-modal]'),
           modal = document.querySelector('.modal');
        //    modalCloseBtn = document.querySelector('[data-close]'); // Не нужен крестик, потому что есть динамически созданный элемент

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show'); //убрать toggle
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    }       
    
    modalTriggger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // modalCloseBtn.addEventListener('click', closeModal); //Закрытие окна крестиком, убираем т.к. это не работает при динамическом добавлении другого мод окна

    modal.addEventListener('click', (e) => {             // Закрытие она кликом на пустую область + кликом на крестик 
         if (e.target === modal || e.target.getAttribute('data-close') === '' ) {
            closeModal();
         }
    });

    document.addEventListener('keydown', (e) => {           // Закрытие окна нажатием на ESCAPE
          if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
          }
    });

    const modalTimerID = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

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

    //  функция, кот отвечает только за получение данных с сервера: get запрос
    const getResource = async(url) => {            // async - указывает что внутри функции будет какой то асинхронный код
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Coluld not fetch ${url}, status: ${res.status}`);          // выкидываем новую ошибку (если сервер вернет 400 или 500)
        }

        return await res.json();                     // вернет промис модифицированный в объект      await - ждем окончания работы метода json
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     }); 

    axios.get('http://localhost:3000/menu') //не смотря на подчеркивание все должно работать, потому что эта переменная идет из другого скриптового файла
        .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
        });
        
    // Способ получения данных из сервера и вставки на страницу (если это нужно толко однажды и не будет изменяться в дальнейшем)
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

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',//, //что бы использовать картинки надо просто указать к ним путь, если сообщение, то прописать его
        success: 'Спасибо! Мы скоро свяжемся с вами',
        failure: 'Что-то пошло не так...',
    };

    // подвязываем под каждую форму функцию bindPostData
    forms.forEach(item => {
        bindPostData(item);
    });

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

            postData('http://localhost:3000/requests', json)  // модифицируем данные из объекта в JSON формат
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
        openModal();

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
            closeModal();
        }, 4000);
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),  // массив из картинок
          slider = document.querySelector('.offer__slider'),    // весь элемент слайдера
          prev = document.querySelector('.offer__slider-prev'), // стрелка влево
          next = document.querySelector('.offer__slider-next'), // стрелка вправо
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'), // внешняя обертка слайдов
          slidesField = document.querySelector('.offer__slider-inner'),     // внутренняя обертка слайдов
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

    next.addEventListener('click', ()=> {
        if (offset == +width.slice(0, width.length - 2) * (slides.length -1)) {        //'500px' - переводим в число и убираем 2 посл символа
            offset = 0;
        } else {
           offset += +width.slice(0, width.length - 2); 
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
            offset = +width.slice(0, width.length - 2) * (slides.length -1);  //'500px' - переводим в число и убираем 2 посл символа
        } else {
           offset -= +width.slice(0, width.length - 2);                       
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
            offset = +width.slice(0, width.length - 2) * (slideTo -1); // устанавливаем величину сдвига 

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
    
});