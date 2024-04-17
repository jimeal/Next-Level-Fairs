let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;
let speed =  0.1;

const $ = (selector) => document.querySelector(selector);

const inner = document.querySelector(".cursor--inner");
const trInner = document.querySelector('.cursor-tr-inner');
const cursor = document.querySelector(".cursor");
const moveImg = document.querySelectorAll(".header-item svg");


/* Percent Loading Animation */
const percentCalc = percent => {
  if (isNaN(percent)) {
    val = 0; 
  }else {
    if (percent < 0) { percent = 0;}
    if (percent > 100) { percent = 100;}
  }
}

const animateValue = (id, start, end, duration) => {
  let range = start - end,
      current = start,
      //increment = 4,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);


  const timer = setInterval(function() {
    current += 1;
    obj.innerText = current + "%";

    percentCalc(current);

    if (current >= end) {
      clearInterval(timer);
      $(".preloader--btn-per").style.opacity = 0;
      $(".preloader--btn-per").style.height = 0;
      $(".preloader--btn-per").style.visibility = "hidden";
      $(".preloader--btn").style.backgroundColor = "#1e4029";
      $(".preloader--btn-hold").style.transform = `translate(-50%, -50%)`;
      $(".preloader--btn-hold").style.visibility = "visible";
      $(".preloader--btn-hold").style.opacity = 1;
    }
  }, stepTime);
}

const loop = () => {
  targetX += (x - targetX) * speed;
  targetY += (y - targetY) * speed;

  moveImg[0].style.transform = `translate(${targetX / 35}px, ${targetY / 30}px)`;
  moveImg[1].style.transform = `translate(${-targetX / 20}px, ${-targetY / 30}px)`;
  moveImg[2].style.transform = `translate(${targetX / 20}px, ${targetY / 30}px)`;
  moveImg[3].style.transform = `translate(${targetX / 25}px, ${targetY / 30}px)`;
  moveImg[4].style.transform = `translate(${targetX / 30}px, ${targetY / 30}px)`;
  moveImg[5].style.transform = `translate(${-targetX / 10}px, ${targetY / 20}px)`;

  $(".item2 .item-wrap").style.transform = `translate(${-targetX / 40}px, ${-targetY / 50}px)`;
  $(".item3 .item-wrap").style.transform = `translate(${targetX / 50}px, ${targetY / 60}px)`;

  $(".header-center").style.transform = `translate(${-targetX / 30}px, ${-targetY / 30}px)`;
  

  trInner.style.top = targetY.toFixed(2) + "px";
  trInner.style.left = targetX.toFixed(2) + "px";

  requestAnimationFrame(loop);
};
loop();

window.addEventListener("DOMContentLoaded", () =>{
  targetX += (x - targetX) * speed;
  targetY += (y - targetY) * speed;

  $(".ani-bar-top").style.transform = `translate3d(${targetX / 30}px, 0, 0)`;

  /* Loading */
  animateValue('#preloader--btn-per', 0, 100, 3000)
})

$(".header").addEventListener("mousemove", (e) => {
  x = e.pageX - innerWidth / 2;
})

window.addEventListener("mousemove", (e) => {
  x = e.pageX;
  y = e.pageY;

  inner.style.top = e.clientY + "px";
  inner.style.left = e.clientX + "px";
})

window.addEventListener("mousedown", () => {
  cursor.classList.add('active');
})  
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
})

const createRipple = (e) => {
  x = e.pageX;
  y = e.pageY;
  let ripple = document.createElement("span");

  ripple.classList.add('ripple');
  cursor.appendChild(ripple);

  ripple.style.top = (e.clientY -  ripple.clientHeight / 2)+ "px";
  ripple.style.left = (e.clientX - ripple.clientWidth / 2) + "px";

  ripple.addEventListener("animationend", () => {
    cursor.removeChild(ripple)
  })
}

window.addEventListener("click", (e) => {
  createRipple(e)
})

const preloaderBtn = document.querySelector(".preloader--btn");
const preloaderBtnText = document.querySelector(".preloader--btn span");

let intervalId = null;
let scale = 1;
const preloaderHide = 18;


const setPreloaderStyle = (scale) => {
  preloaderBtn.style.transform = `scale(${scale})`;
  preloaderBtnText.style.opacity = 1 - (scale - 1) / preloaderHide;
}

preloaderBtn.addEventListener("mousedown", () => {
  intervalId = setInterval(() => {
    scale += 0.175;
    setPreloaderStyle(scale);

    if(scale > 1 + preloaderHide) {
      $(".preloader").classList.remove("show-area");
      $(".preloader").classList.add("hide-area");
      $(".container").classList.add("show-area");
      $(".container").classList.remove("hide-area");
      clearInterval(intervalId)
      $(".preloader").style.display = "none";
      $("body").style.overflowY = "auto";
    }
  })
})

preloaderBtn.addEventListener("mouseup", () => {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    scale -= 0.075;
    setPreloaderStyle(scale)

    if(scale <= 1) {
      clearInterval(intervalId)
    }
  }, 10);
})


const spyEls = document.querySelectorAll('.scroll-spy');

spyEls.forEach(function(spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,
            triggerHook: .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});
