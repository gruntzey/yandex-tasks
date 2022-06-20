
A. Лабиринт

Нужно написать и экспортировать функцию для выхода из лабиринта, при этом гарантируется, что выход есть всегда. Функция принимает на вход начальную точку start и объект game для взаимодействия с лабиринтом и должна вернуть точку { x, y }, для которой game.state(x, y).finish === true

Не деструктурируйте game, ваше решение не будет проходить тесты.

Описание функции и параметров дано на Typescript, но функцию требуется написать на JS. Важно использовать именно module.exports = для экспорта функции.

module.exports = function main(game: Game, start: Point): Promise<Point> {
}

У game есть асинхронные функции, которые позволяют двигаться от любой ячейки влево, вправо, вверх или вниз. При попытке шагнуть в стену или из непосещённой клетки методы кидают ошибку. Также асинхронная функция получения состояния ячейки работает только для посещённых ячеек, для остальных – кидает ошибку.

Ось x в лабиринте идет слева-направа, y - сверху-вниз.
Формат данных

export interface Point {
    x: number;
    y: number;
}

export interface Game {
    // Попытаться шагнуть из клетки лабиринта вверх
    up(x: number, y: number): Promise<void>;
    // Попытаться шагнуть из клетки лабиринта вниз
    down(x: number, y: number): Promise<void>;
    // Попытаться шагнуть из клетки лабиринта влево
    left(x: number, y: number): Promise<void>;
    // Попытаться шагнуть из клетки лабиринта вправо
    right(x: number, y: number): Promise<void>;

    // Получить состояние клетки лабиринта
    state(x: number, y: number): Promise<{
        top: boolean; // можно ли шагать вверх
        bottom: boolean; // можно ли шагать вниз
        left: boolean; // можно ли шагать влево
        right: boolean; // можно ли шагать вправо
        start: boolean; // ячейка - стартовая
        finish: boolean; // ячейка - финиш
    }>;
}

Для тестирования решения скачивайте приложенный файл labyrinth-tester.zip (ссылка "Скачать условие задачи" ниже), в нем в файле src/main.js можно писать решение и визуализировать прохождение лабиринта. Важно использовать именно module.exports = для экспорта функции (в архиве используется export default только для визуализации)

Тесты расположены в порядке увеличения размера лабиринта.

Если ваше решение проходит лишь некоторые тесты, то подумайте о том, как ускорить ваше решение. К примеру, постарайтесь не использовать try catch блоки. Кроме этого, для решения данной задачи могут помочь методы из Promise API https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise#методы

Есть следующие ограничения: 1. Ограничение времени: 10 секунд 2. Ограничение памяти: 64.0 Мб

Решение будет проверяться на Node 12.

# labyrinth-tester

Для запуска запустите `npm i && npm start`.

После этого откройте http://localhost:5000/, там будет доступна визуализация процесса прохождения лабиринта.

Решение можно писать в файле src/main.js (HMR недоступен, необходимо обновлять страницу вручную).