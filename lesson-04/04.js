/*
Напишите функцию `doubleEachCharacter`, которая принимает строку и возвращает новую строку, где каждый символ из исходной строки повторяется дважды.

Входные данные:

- **`str`**: Строка, символы которой нужно удвоить.

Выходные данные:

- Новая строка с каждым символом, повторенным дважды.

Пример работы функции: `doubleEachCharacter('hello')` вернёт `'hheelllloo'`
*/

function doubleEachCharacter(inputString) {
    let result = '';
    for (let i = 0; i < inputString.length; i++) {
        result += inputString[i] + inputString[i];
    }
    return result;
}
// const originalString = "Hello";
// const doubledString = doubleEachCharacter(originalString);
// console.log(doubledString)