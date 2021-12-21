let allCards = document.getElementById("allCards") || "";
let cards = document.getElementsByClassName("clientCard");
let scrollAmount = 0;
let availableWidth = allCards.scrollWidth - allCards.clientWidth;
let oneCardWidth, extraWidth;
let built = document.getElementsByClassName("bulit");
let parent = document.getElementsByClassName("dots")[0];
let numberOfDots = Math.ceil(cards.length / 3);
let bit = oneCardWidth * 3;
let oldDot = 0;
let links = document.getElementsByClassName("navLinks")[0];
let body = document.getElementsByTagName("body")[0];


/**
 * to re calculate sizes for cards width and available scroll width based on screen size also it will generate the scroll dots and bind the function for each dot
 */
const calculateSizes = () => {
  // clean dots parent
  parent.innerHTML = "";
  // generate dots
  for (let j = 0; j < numberOfDots; j++) {
    parent.innerHTML += `<span class="bulit"></span>`;
    built[0].classList.add("active");
  }
  // bind click for each dot
  for (let i = 0; i < built.length; i++) {
    built[i].addEventListener("click", bindClick(i));
  }
  // required math..
  scrollAmount = 0;
  availableWidth = allCards.scrollWidth - allCards.clientWidth;
  oneCardWidth = cards[0].clientWidth + 30;
  extraWidth = availableWidth - oneCardWidth * (cards.length - 3);
  bit = oneCardWidth * 3;
  allCards.scroll(scrollAmount, 0);
  // make sure each new resize starts with the first dot active
  if (oldDot) {
    built[oldDot].classList.remove("active");
    oldDot = 0;
    built[0].classList.add("active");
  }
}


/**
 * function will add 'active' class to the dot that match the scroll amount
 * @param {number} scrollAmount
 */
const witchDotActive = (scrollAmount) => {
  let dotIndex = 0;
  scrollAmount > 0 ? (dotIndex = Math.floor(scrollAmount / bit)) : "";

  scrollAmount == availableWidth ? (dotIndex = built.length - 1) : "";

  built[oldDot].classList.remove("active");
  oldDot = dotIndex;
  built[dotIndex].classList.add("active");
}


/**
 * triggers scrolling Right using the symbol in the HTML side beside adding unlimited scroll in case teh available scroll finished
 */
const goRight = () => {
  if (scrollAmount < availableWidth) {
    // safety check..
    scrollAmount + oneCardWidth > availableWidth
      ? (scrollAmount = availableWidth)
      : (scrollAmount += oneCardWidth);

    // in case manual scroll wasn't in one card amount .. so this statement will let the next click match exactly the next card, so the next click will continue normally..
    if(scrollAmount % oneCardWidth && scrollAmount != availableWidth){
      scrollAmount -= scrollAmount % oneCardWidth
    }


    allCards.scroll(scrollAmount, 0);
    witchDotActive(scrollAmount);
  } else {
    // unlimited scroll
    scrollAmount = 0;
    allCards.scroll(0, 0);
    witchDotActive(scrollAmount);
  }
}


/**
 * triggers scrolling Left using the symbol in the HTML side beside adding unlimited scroll in case teh available scroll finished
 */
const goLeft = () => {
  if (scrollAmount == availableWidth) {
    scrollAmount -= extraWidth;
    console.log('hi there ', extraWidth);
    allCards.scroll(scrollAmount, 0);
  } else if (scrollAmount > 0) {
    // safety check..
    scrollAmount - oneCardWidth < 0
      ? (scrollAmount = 0)
      : (scrollAmount -= oneCardWidth);

    // in case manual scroll wasn't in one card amount .. so this statement will let the next click will take the extras and start with new card directly..
    if(scrollAmount % oneCardWidth && scrollAmount){
      scrollAmount -= scrollAmount % oneCardWidth
    }

    allCards.scroll(scrollAmount, 0);
    witchDotActive(scrollAmount);
  } else if (!scrollAmount) {
    // unlimited scroll
    scrollAmount = availableWidth;
    allCards.scroll(availableWidth, 0);
    witchDotActive(scrollAmount);
  }
}


/**
 * this function will reserve the clicked dot index and tigress the callback function
 * @param {number} i
 * @returns callBackFunction
 */
const bindClick = (i) => {
  return () => {
    built[oldDot].classList.remove("active");
    oldDot = i;
    built[i].classList.add("active");

    let s = bit * i;
    scrollAmount = s;
    allCards.scroll(scrollAmount, 0);
  };
}


/**
 * toggle the 'navLinks' container style based on the attached animation
 */
function showLinks() {
  if (links.style.display == "flex") {
    links.classList.remove("animatIn");
    links.classList.add("animatOut");
    // waiting the animation complete
    setTimeout(() => {
      links.style.display = "none";
    }, 300);
  } else {
    links.classList.add("animatIn");
    links.classList.remove("animatOut");
    links.style.display = "flex";
  }
}


// listener for any screen resize
window.addEventListener(
  "resize",
  function () {
    if (window.screen.width > 769) {
      links.style.display = "flex";
    } else {
      links.style.display = "none";
    }
    calculateSizes();
  },
  true
);


// any scroll listener
allCards.addEventListener("scroll", function(ev){
  scrollAmount = ev.target.scrollLeft;
  witchDotActive(ev.target.scrollLeft);
})

calculateSizes();