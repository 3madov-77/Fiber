let allCards = document.getElementById("allCards") || "";
let cards = document.getElementsByClassName("clientCard");
let scrollAmuont = 0;
let avilableWidth = allCards.scrollWidth - allCards.clientWidth;
let oneCardWidth, extraWidth;
let bulit = document.getElementsByClassName("bulit");
let parent = document.getElementsByClassName("dots")[0];
let numberOfDots = Math.ceil(cards.length / 3);
let bit = oneCardWidth * 3;
let oldDot = 0;
let links = document.getElementsByClassName("navLinks")[0];
let body = document.getElementsByTagName("body")[0];


/**
 * to re calculate sizes for cards width and avilable scroll width based on screen size also it will genrate the scroll dots and bind the function for each dot
 */
const calculatSizes = () => {
  // clean dots parent
  parent.innerHTML = "";
  // genrate dots
  for (let j = 0; j < numberOfDots; j++) {
    parent.innerHTML += `<span class="bulit"></span>`;
    bulit[0].classList.add("active");
  }
  // bind click for each dot
  for (let i = 0; i < bulit.length; i++) {
    bulit[i].addEventListener("click", bindClick(i));
  }
  // requierd math..
  scrollAmuont = 0;
  avilableWidth = allCards.scrollWidth - allCards.clientWidth;
  oneCardWidth = cards[0].clientWidth + 30;
  extraWidth = avilableWidth - oneCardWidth * (cards.length - 3);
  bit = oneCardWidth * 3;
  allCards.scroll(scrollAmuont, 0);
  // make sure each new resize starts with the first dot active
  if (oldDot) {
    bulit[oldDot].classList.remove("active");
    oldDot = 0;
    bulit[0].classList.add("active");
  }
}


/**
 * function will add 'active' class to the dot that match the scroll amount
 * @param {number} scrollAmuont 
 */
const witchDotActve = (scrollAmuont) => {
  let dotIndex = 0;
  scrollAmuont > 0 ? (dotIndex = Math.floor(scrollAmuont / bit)) : "";

  scrollAmuont == avilableWidth ? (dotIndex = bulit.length - 1) : "";

  bulit[oldDot].classList.remove("active");
  oldDot = dotIndex;
  bulit[dotIndex].classList.add("active");
}


/**
 * trigers scrolling Right using the symble in the HTML side beside adding unlimted scroll in case teh avilable scroll finshed
 */
const goRight = () => {
  if (scrollAmuont < avilableWidth) {
    // safty check..
    scrollAmuont + oneCardWidth > avilableWidth
      ? (scrollAmuont = avilableWidth)
      : (scrollAmuont += oneCardWidth);

    // in case manual scroll wasnt in one card amount .. so this stament will let the next click match axactly the next card, so the next click will continue normaly..
    if(scrollAmuont % oneCardWidth && scrollAmuont != avilableWidth){
      scrollAmuont -= scrollAmuont % oneCardWidth
    }


    allCards.scroll(scrollAmuont, 0);
    witchDotActve(scrollAmuont);
  } else {
    // unlimted scroll
    scrollAmuont = 0;
    allCards.scroll(0, 0);
    witchDotActve(scrollAmuont);
  }
}


/**
 * trigers scrolling Left using the symble in the HTML side beside adding unlimted scroll in case teh avilable scroll finshed
 */
const goLeft = () => {
  if (scrollAmuont == avilableWidth) {
    scrollAmuont -= extraWidth;
    console.log('hi there ', extraWidth);
    allCards.scroll(scrollAmuont, 0);
  } else if (scrollAmuont > 0) {
    // safty check..
    scrollAmuont - oneCardWidth < 0
      ? (scrollAmuont = 0)
      : (scrollAmuont -= oneCardWidth);
    
    // in case manual scroll wasnt in one card amount .. so this stament will let the next click will take the extras and start with new card dirctly..
    if(scrollAmuont % oneCardWidth && scrollAmuont){
      scrollAmuont -= scrollAmuont % oneCardWidth
    }

    allCards.scroll(scrollAmuont, 0);
    witchDotActve(scrollAmuont);
  } else if (!scrollAmuont) {
    // unlimted scroll
    scrollAmuont = avilableWidth;
    allCards.scroll(avilableWidth, 0);
    witchDotActve(scrollAmuont);
  }
}


/**
 * this function will reseve the clicked dot index and tirgers the callback function
 * @param {number} i 
 * @returns callBackFunction
 */
const bindClick = (i) => {
  return () => {
    bulit[oldDot].classList.remove("active");
    oldDot = i;
    bulit[i].classList.add("active");

    let s = bit * i;
    scrollAmuont = s;
    allCards.scroll(scrollAmuont, 0);
  };
}


/**
 * togle the 'navLinks' container style based on the attached animation
 */
function showLinks() {
  if (links.style.display == "flex") {
    links.classList.remove("animatIn");
    links.classList.add("animatOut");
    // waiting the animationto complete
    setTimeout(() => {
      links.style.display = "none";
    }, 300);
  } else {
    links.classList.add("animatIn");
    links.classList.remove("animatOut");
    links.style.display = "flex";
  }
}


// listner for any screen resize
window.addEventListener(
  "resize",
  function () {
    if (window.screen.width > 769) {
      links.style.display = "flex";
    } else {
      links.style.display = "none";
    }
    calculatSizes();
  },
  true
);


// any scroll listner
allCards.addEventListener("scroll", function(ev){
  scrollAmuont = ev.target.scrollLeft;
  witchDotActve(ev.target.scrollLeft);
})

calculatSizes();