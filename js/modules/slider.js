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

export default slider;