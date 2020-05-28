// let sideIcon = document.getElementById('side-icon')
// sideIcon.style.height = window.innerHeight
let glbuttons = document.getElementById('overlay-link')
console.log(window.innerWidth)
if (window.innerWidth < 850){
    
    glbuttons.style.left = '50%'
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }




//using sticky positining for now, but 2 examples below are
//possible options in the event wanting to cater to internet explorer
// window.onscroll = function() {myFunction()};

// var navbar = document.getElementById("mySidenav");
// var sticky = navbar.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }

//this is prob a better method:
// var header = document.querySelector('.header');
// var origOffsetY = header.offsetTop;

// function onScroll(e) {
//   window.scrollY >= origOffsetY ? header.classList.add('sticky') :
//                                   header.classList.remove('sticky');
// }

// document.addEventListener('scroll', onScroll);

