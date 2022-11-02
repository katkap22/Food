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

export default timer;