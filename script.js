'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const sectionTwo = document.querySelector('#section--2');
const sectionThree = document.querySelector('#section--3');
const linkSecOne = document.querySelectorAll('.nav__link')[0];
const linkSecTwo = document.querySelectorAll('.nav__link')[1];
const linkSecThree = document.querySelectorAll('.nav__link')[2];

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

  btnsOpenModal.forEach( item => {
    item.addEventListener('click', openModal);
  });


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const headNew = document.createElement(`div`);

headNew.classList.add(`cookie-message`);

headNew.innerHTML = `HELLO FREAK! <button class='btn btn--close-cookie'>CLICK ME</button>`;

// header.prepend(headNew);

// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   headNew.remove();
// })

headNew.style.backgroundColor = `grey`;
headNew.style.width = `120%`;
headNew.style.height = Number.parseFloat(getComputedStyle(headNew).height, 10) + 40 +`px`;

console.log(getComputedStyle(headNew).height);
// document.documentElement.style.setProperty(`--color-primary`, `green`);


const log = document.querySelector('.nav__logo');






  document.querySelector('.nav__links').addEventListener('click', function(e){
    e.preventDefault();

    if(e.target.classList.contains('nav__link')){
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    };

  });

  learnMoreBtn.addEventListener('click', function(e){
    e.preventDefault();
    sectionOne.scrollIntoView({behavior: 'smooth'});
  })

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const operationCont = document.querySelectorAll('.operations__content');

  tabContainer.addEventListener('click', function(e){
    const btn = e.target.closest('.operations__tab');

    // GUARD
    if(!btn) return;
    // CLEAR CLASS ALL
    tabs.forEach(i => {
      i.classList.remove('operations__tab--active');
    })
    // ADD TO CLICKED
    btn.classList.add('operations__tab--active');

        // CLEAR CLASS ALL
    operationCont.forEach(i => {
      i.classList.remove('operations__content--active');
    })
        // CHANGE CONTENT
    document.querySelector(`.operations__content--${btn.dataset.tab}`)
    .classList.add('operations__content--active');


  });

  learnMoreBtn.addEventListener('click', function(e){
    e.preventDefault();
    sectionOne.scrollIntoView({behavior: 'smooth'});
  })


// NAV HOVER EFFECT
const navbarAll = document.querySelector('.nav');

const hoverEffect = function (e , data) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const linkss = link.closest('.nav').querySelectorAll('.nav__link');
    const logo =  link.closest('.nav').querySelector('img');

    linkss.forEach( i => {
      if( i !== link) i.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

navbarAll.addEventListener('mouseover', hoverEffect.bind(0.5));

navbarAll.addEventListener('mouseout', hoverEffect.bind(1));


// STYCKY

// const init = sectionOne.getBoundingClientRect();
// console.log(init);
// window.addEventListener('scroll', function(){
//   if(window.pageYOffset > init.top){
//     document.querySelector('.nav').classList.add('sticky');
//   }if( window.pageYOffset < init.top){
//     document.querySelector('.nav').classList.remove('sticky');
//   }
// })

const headerr = document.querySelector('.header');

const navStyc = function(entr){
  // console.log(entr);
  const [entr_one] = entr;
  if(!entr_one.isIntersecting){
      document.querySelector('.nav').classList.add('sticky');
  } else {
      document.querySelector('.nav').classList.remove('sticky');
  }

}

const obsNav = new IntersectionObserver(navStyc , {root: null, threshold: 0, rootMargin: `-90px` });
obsNav.observe(headerr);


// SECTION ANIMATION

const allSec = document.querySelectorAll('.section');

const secAnim = function(entries, observer){
  const [entrie] = entries;
  if(!entrie.isIntersecting) return
  entrie.target.classList.remove('section--hidden')
  observer.unobserve(entrie.target)
}

const obsSec = new IntersectionObserver(secAnim , {root: null, threshold: 0.15});
allSec.forEach( i => {
  obsSec.observe(i);
  // i.classList.add('section--hidden');
});

// LAZY LOAD IMG
const allImg = document.querySelectorAll('.features img');

const imgAnim = function(entries, observer){
  const [entrie] = entries;
  if(!entrie.isIntersecting) return
  entrie.target.src = entrie.target.dataset.src;
  entrie.target.addEventListener('load', function(){
    entrie.target.classList.remove('lazy-img');
  })

  observer.unobserve(entrie.target)
}

const obsImg = new IntersectionObserver(imgAnim , {root: null, threshold: 0.30, rootMargin: `200px`});
allImg.forEach( i => {
  obsImg.observe(i);
});




// slider

const allSlides = document.querySelectorAll('.slide');
const slide = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

const transSlide = function(data){
  allSlides.forEach((item , num) => {
  item.style.transform = `translateX(${100 * (num - data)}%)`;
  })
}

allSlides.forEach(( item , num) => item.style.transform = `translateX(${100*num}%)`);
// slide.style.transform = 'scale(0.4)'
// slide.style.overflow = `visible`;

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(i => i.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide = '${slide}']`).classList.add('dots__dot--active');
}

// buttons



let currSlide = 0;
const maxSlides = allSlides.length;

btnRight.addEventListener('click', function(){
  if(currSlide === maxSlides - 1){
  currSlide = 0;}
  else {
  currSlide++;
  }
  transSlide(currSlide);
  activateDot(currSlide);
})

btnLeft.addEventListener('click', function(){
  if(currSlide === 0 ){
  currSlide = maxSlides - 1;}
  else {
  currSlide--;
  }
  transSlide(currSlide);
  activateDot(currSlide);
})


document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight'){
    if(currSlide === maxSlides - 1){
    currSlide = 0;}
    else {
    currSlide++;
    }
    transSlide(currSlide);
    activateDot(currSlide);
  }
  if(e.key === 'ArrowLeft'){
    if(currSlide === 0 ){
    currSlide = maxSlides - 1;}
    else {
    currSlide--;
    }
    transSlide(currSlide);
    activateDot(currSlide);
  }
})

// dots
const creatDots = function(){
  allSlides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class = 'dots__dot' data-slide='${i}'><button>`
  )
  });
}
creatDots();
activateDot(0);



dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const currentDot = e.target.dataset.slide;
    transSlide(currentDot);
  }
  activateDot(currSlide);
})

//////////////////

// learnMoreBtn.addEventListener('click', function(e){
//   e.preventDefault();
//   // const secOne = sectionOne.getBoundingClientRect();
//   // console.log(secOne)
//   // console.log(window.pageYOffset);
//   // window.scrollTo(secOne.left, secOne.top + window.pageYOffset);
//   // window.scrollTo({
//   //   top:secOne.top + window.pageYOffset,
//   //   left: secOne.left +window.pageXOffset,
//   //   behavior:`smooth`
//   // })
//   sectionOne.scrollIntoView({behavior: 'smooth'});
//   // console.log(sectionOne.getBoundingClientRect()); //scroll to top and get coordinates of section
//   // console.log(e.target.getBoundingClientRect());
// })
