import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
        openModal('.modal', modalTimerID);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;