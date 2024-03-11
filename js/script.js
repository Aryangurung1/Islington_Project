'use strict';

// const inkElem = null;
const addEventOn = (elem, type, callback)=>{
    if(elem.length > 1){
        for(let i = 0; i<elem.length; i++){
            elem[i].addEventListener(type, callback);
        }
    }else{
        elem.addEventListener(type, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navbarTogglers = document.querySelectorAll("[data-nav-toggler]");
const navlinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const links = document.querySelectorAll("[link]");
const subTitle = document.querySelector(".about-content .section-subtitle");
const title = document.querySelector(".about-content .section-title");
const img = document.querySelector(".about #change-img");
const text1 = document.querySelector(".text-1");
const text2 = document.querySelector(".text-2");
const text3 = document.querySelector(".text-3");
const img2 = document.querySelector(".about-shape-2");

const lists = document.querySelectorAll(".faq-text li");
const answer = document.querySelector(".accordion-content");

const testimonContainer = document.querySelector(".testimon-container");
let thumnails = document.querySelectorAll(".thumnail-items");
let thumnailsControls = [...thumnails];
const testimonItems = document.querySelectorAll(".testimon-item");



const toggleNavbar = ()=>{
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
}

addEventOn(navbarTogglers, "click", toggleNavbar);

const closeNavbar = ()=>{
    navbar.classList.remove("active");
    overlay.classList.remove("active");
}

addEventOn(navlinks, "click", closeNavbar);

const link2 = ()=>{
    img.setAttribute("src", "./img/experts.jpg");
    subTitle.innerText = "Instructors";
    title.innerHTML = "Our <span class='span'>Skilled</span> Instructor Team";
    text1.innerText = "Our team comprises skilled professionals adept at delivering high-quality educational content and guidance.";
    text2.innerHTML = "";
    text3.innerHTML = "";
    
}

const link3 = ()=>{
    img.setAttribute("src", "./img/lifetime.jpg");
    subTitle.innerText = "Access";
    title.innerHTML = "Unlock Lifetime <span class='span'>Access</span>, Endless Learning Awaits!";
    text1.innerText = "Life-changing learning experiences await with our exclusive lifetime access membership offer.";
    text2.innerHTML = "";
    text3.innerHTML = "";

}

const link1 = ()=>{
    img.setAttribute("src", "./img/about2.jpg");
    subTitle.innerText = "ABOUT US";
    title.innerHTML = "Over 10 years in <span class='span'>skill</span> Development";
    text1.innerText = "Empowering learners globally with tailored education, fostering growth, and cultivating success through innovative online learning experiences..";
    text2.innerText = "Maximize potential with minimal effort";
    text3.innerText = "Tiny actions yield mighty results";
}

const linkClicked = (event)=>{
    for(let link of links){
        link.classList.remove("active");
    }
    console.log(event.target);
    let elm = event.target;
    elm.classList.add("active")
    if(elm.classList.contains("link-2")){
        link2();
    }else if(elm.classList.contains("link-3")){
        link3();
    }else{
        link1();
    }
}

addEventOn(links, "click", linkClicked);

const accordion = (event)=>{
    
    let clickedLi;
    if(event.target.classList.contains("question-arrow")){
        clickedLi = event.target.parentElement;
    }else{
        clickedLi = event.target.parentElement.parentElement;
    }
    clickedLi.classList.toggle("showAnswer");
}

addEventOn(lists, "click", accordion);

thumnailsControls[0].classList.add("thumnail-controls-previous");
thumnailsControls[thumnailsControls.length-1].classList.add("thumnail-controls-next");

class Carousel{
    constructor(container, items, thumnailsControls){
        this.carouselContainer = container;
        this.thumnailsControls = thumnailsControls;
        this.carouselArray = [...items];
    }

    updateTestimon(){
        this.carouselArray.forEach(el=>{
            el.classList.remove("testimon-1");
            el.classList.remove("testimon-2");
            el.classList.remove("testimon-3");


        });

        this.carouselArray.slice(0, 3).forEach((el, i)=>{
            el.classList.add(`testimon-${i+1}`);
        });

    }

    updateThumnail(){
        this.thumnailsControls.forEach(el=>{
        el.classList.remove("thumnail-1");
        el.classList.remove("thumnail-2");
        el.classList.remove("thumnail-3");
        el.classList.remove("thumnail-controls-previous");
        el.classList.remove("thumnail-controls-next");
                   
        });
                
        this.thumnailsControls.slice(0, 3).forEach((el, i)=>{
            el.classList.add(`thumnail-${i+1}`);
        });
    
        this.thumnailsControls[0].classList.add("thumnail-controls-previous");
        this.thumnailsControls[thumnailsControls.length-1].classList.add("thumnail-controls-next");
                
    }

    setCurrentState(direction){
        if(direction.classList.contains('thumnail-controls-previous')){
            this.carouselArray.unshift(this.carouselArray.pop());
            this.thumnailsControls.unshift(thumnailsControls.pop());
            console.log(thumnailsControls);
        }else if(direction.classList.contains('thumnail-controls-next')){
            this.carouselArray.push(this.carouselArray.shift());
            this.thumnailsControls.push(thumnailsControls.shift());
        }
        this.updateTestimon();
        this.updateThumnail();
    }

    useControls(){
        const trigger = [...thumnailsControls];
        trigger.forEach(control =>{
            control.addEventListener('click', (e)=>{
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

}

const exampleCarousel = new Carousel(testimonContainer, testimonItems, thumnailsControls);
exampleCarousel.useControls();

const noScroll = function(){
    this.scrollLeft = 0;
}

addEventOn(testimonContainer, "scroll", noScroll);

document.addEventListener("DOMContentLoaded", function(){
    const header = document.querySelector("[data-header]");
    const backTo = document.querySelector("[data-back-top-btn]");
    const scrollHead = ()=>{
        if(window.scrollY > 100){
            header.classList.add("active");
            backTo.classList.add("active");
        }else{
            header.classList.remove("active");
            backTo.classList.remove("active");
        }
    }

    window.addEventListener("scroll", scrollHead);
})