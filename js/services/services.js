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

 export {postData};   
 export {getResource};