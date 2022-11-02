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

export default modal;
export {closeModal};
export {openModal};