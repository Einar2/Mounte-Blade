let preview = document.querySelector(".preview");
let header = document.querySelector('header');

const w = window.innerWidth;
const h = window.innerHeight;
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
const rate = 60;
let arc = 600; // Изменено на let, т.к. меняется позже
let time;
let count;
const size = 1;
let speed = 30; // Изменено на let, т.к. меняется позже
const lights = [];
let colors = ['white']; // Изменено на let, т.к. меняется позже
let timerID; // Добавлено для clearTimeout

canvas.width = w; // Прямое присваивание вместо setAttribute
canvas.height = h; // Прямое присваивание вместо setAttribute

function init() {
    time = 0;
    count = 0;

    for (let i = 0; i < arc; i++) {
        lights[i] = {
            x: Math.random() * w, // Упрощено: Math.ceil() не нужен
            y: Math.random() * h,  // Упрощено: Math.ceil() не нужен
            toX: Math.random() * 5 + 1,
            toY: Math.random() * 5 + 1,
            c: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * size
        };
    }
}

function drawBubble() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < arc; i++) {
        const li = lights[i];

        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.fill();

        li.x += li.toX * (time * 0.05); // Упрощено: прямой расчет вместо присваивания
        li.y += li.toY * (time * 0.05);

        if (li.x > w) {
            li.x = 0;
        } else if (li.x < 0) {
            li.x = w;
        }

        if (li.y > h) {
            li.y = 0;
        } else if (li.y < 0) {
            li.y = h;
        }
    }
    if (time < speed) {
        time++;
    }
    timerID = setTimeout(drawBubble, 1000 / rate);
}

init();
drawBubble();

setTimeout(() => {
    canvas.style.opacity = "1";
    setTimeout(() => {
        canvas.style.opacity = "0";
        preview.style.opacity = "0";
        setTimeout(() => {
            preview.style.display = "none";
            header.style.display = 'block';
            setTimeout(() => {
                header.style.opacity = '1';
                speed = 2;
                arc = 300;
                colors = ['#8c8a8a'];
                init();
                drawBubble();
                canvas.style.opacity = "1";
            }, 500);
        }, 500);
    }, 3000);
}, 1500);