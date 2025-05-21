let preview = document.querySelector(".preview")
let header = document.querySelector('header')

var w = window.innerWidth,
  h = window.innerHeight,
  canvas = document.getElementById('snow'),
  ctx = canvas.getContext('2d'),
  rate = 60,
  arc = 700,
  time,
  count,
  size = 2,
  speed = 30,
  lights = new Array,
  colors = ['white'];

canvas.setAttribute('width', w);
canvas.setAttribute('height', h);

function init() {
  time = 0;
  count = 0;

  for (var i = 0; i < arc; i++) {
    lights[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 + 1,
      toY: Math.random() * 5 + 1,
      c: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * size
    }
  }
}

function bubble() {
  ctx.clearRect(0, 0, w, h);

  for (var i = 0; i < arc; i++) {
    var li = lights[i];

    ctx.beginPath();
    ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
    ctx.fillStyle = li.c;
    ctx.fill();

    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);

    if (li.x > w) { li.x = 0; }
    if (li.y > h) { li.y = 0; }
    if (li.x < 0) { li.x = w; }
    if (li.y < 0) { li.y = h; }
  }
  if (time < speed) {
    time++;
  }
  timerID = setTimeout(bubble, 1000 / rate);
}
init();
bubble();


setTimeout(() => {
  canvas.style.opacity = "1"
  setTimeout(() => {
    canvas.style.opacity = "0"
    preview.style.opacity = "0"
    setTimeout(() => {
      preview.style.display = "none"
      header.style.display = 'block'
      setTimeout(() => {
        header.style.opacity = '1'
        speed = 2
        arc = 400
        colors = ['#8c8a8a'];
        init();
        bubble();
        canvas.style.opacity = "1"


      }, 500)



    }, 500)
  }, 3000)
}, 1500)






// rate = 60,
// arc = 700,
// time,
// count,
// size = 2,
// speed = 30,



