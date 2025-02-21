const basket = [];

function init() {
  dishRender("burger", "burgerContent");
  dishRender("supplyment", "supplymentContent");
  dishRender("drinks", "drinksContent");
  dishRender("saucen", "soucenContent");
}

function dishRender(arr, id) {
  let dishRef = document.getElementById(id);
  dishRef.innerHTML = "";
  for (
    let supplyIndex = 0;
    supplyIndex < supply[`${arr}`].length;
    supplyIndex++
  ) {
    let dishPrice = supply[`${arr}`][supplyIndex].price
      .toFixed(2)
      .replace(".", ",")
      .concat("€");
    dishRef.innerHTML += choseTemplate(arr, supplyIndex, dishPrice);
  }
}

function choseTemplate(arr, supplyIndex, dishPrice) {
  switch (arr) {
    case "burger":
      return getMainDishTemplate(arr, supplyIndex, dishPrice);
    case "supplyment":
    case "drinks":
    case "saucen":
      return getDishTemplate(arr, supplyIndex, dishPrice);
  }
}

function basketRender(id) {
  let basketList = document.getElementById(id);
  basketList.innerHTML = "";
  for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
    dishPrice = getCurrentPrice(basketIndex);
    basketList.innerHTML += getSingleTemplate(basketIndex, dishPrice);
  }
  checkBasket();
  calculateSubTotalPrice("subTotalPrice");
  calculateSubTotalPrice("respSubTotalPrice");
}

function addSingleSupply(arr, supplyIndex) {
  let dishName = supply[`${arr}`][supplyIndex].name;

  switch (
    basket.findIndex((dish) => {
      return dish.name === dishName;
    })
  ) {
    case -1:
      pushToBasket(arr, supplyIndex);
      break;

    default:
      increaseAmount(dishName);
      break;
  }
  basketRender("basketList");
  basketRender("basketRespList");
}

function pushToBasket(arr, supplyIndex) {
  let singleSupply = {
    name: supply[`${arr}`][supplyIndex].name,
    price: supply[`${arr}`][supplyIndex].price,
    amount: 1,
  };

  basket.push(singleSupply);
}

function increaseAmount(dishName) {
  let dishBasketIndex = basket.findIndex((dish) => {
    return dish.name === dishName;
  });
  basket[dishBasketIndex].amount++;
}

function addDish(basketIndex) {
  basket[basketIndex].amount++;
  basketRender("basketList");
  basketRender("basketRespList");
}

function removeDish(basketIndex) {
  if (basket[basketIndex].amount === 1) {
    basket.splice(basketIndex, 1);
  } else {
    basket[basketIndex].amount--;
  }
  basketRender("basketList");
  basketRender("basketRespList");
}

function getCurrentPrice(basketIndex) {
  let currentDishPrice = basket[basketIndex].price * basket[basketIndex].amount;
  let dishPrice = currentDishPrice.toFixed(2).replace(".", ",").concat("€");
  return dishPrice;
}

function calculateSubTotalPrice(id) {
  let subTotalPriceRef = document.getElementById(id);
  let currentDishPrice = 0;
  subTotalPriceRef.innerHTML = "";

  for (let costsIndex = 0; costsIndex < basket.length; costsIndex++) {
    currentDishPrice += basket[costsIndex].price * basket[costsIndex].amount;
    let subTotalPrice = currentDishPrice
      .toFixed(2)
      .replace(".", ",")
      .concat("€");
    subTotalPriceRef.innerHTML = "Zwischensumme: " + subTotalPrice;
    calculateTotalPrice(currentDishPrice, "totalPrice");
    calculateTotalPrice(currentDishPrice, "respTotalPrice");
  }
}

function checkBasket() {
  let checkBasketRef = document.getElementById("totalPrice");
  let checkRespBasketRef = document.getElementById("respTotalPrice");

  if (basket.length === 0) {
    checkBasketRef.innerHTML = "Gesamtsumme: 0,00€";
    checkRespBasketRef.innerHTML = "Gesamtsumme: 0,00€";
  }
}

function calculateTotalPrice(currentDishPrice, id) {
  let totalPriceRef = document.getElementById(id);
  let totalPriceNum = currentDishPrice + 5;
  let totalPrice = totalPriceNum.toFixed(2).replace(".", ",").concat("€");
  totalPriceRef.innerHTML = "";
  totalPriceRef.innerHTML = "Gesamtsumme: " + totalPrice;
}

function clearBasket() {
  let subTotalPriceRef = document.getElementById("subTotalPrice");
  let totalPriceRef = document.getElementById("totalPrice");

  while (basket.length > 0) {
    subTotalPriceRef.innerHTML = "Zwischensumme: 0,00€";
    totalPriceRef.innerHTML = "Gesamtsumme: 0,00€";
    basket.pop();
  }
  basketRender("basketList");
  basketRender("basketRespList");
}

function orderOverlayOn() {
  let overlaySectioRef = document.getElementById("overlaySection");
  overlaySectioRef.classList.remove("d_none");
  clearBasket();
}

function orderOverlayOff() {
  let overlaySectioRef = document.getElementById("overlaySection");
  overlaySectioRef.classList.add("d_none");
}

function toggleRespBasket() {
  let respBasketRef = document.getElementById("respBasketContainer");
  respBasketRef.classList.toggle("d_none");
  document.getElementById("body").classList.toggle("no_scroll");
}

function deleteDish(basketIndex) {
  basket.splice(basketIndex, 1);
  basketRender("basketList");
  basketRender("basketRespList");
}
