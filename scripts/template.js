function getMainDishTemplate(arr, supplyIndex, dishPrice) {
    return `<div class="supply_segment top_bottom_padding site_padding">
    <div class="supply_single">
                <h2>${supply[`${arr}`][supplyIndex].name}</h2>
                <span>
                ${supply[`${arr}`][supplyIndex].ingredients}
                </span>
                <span class="price">${dishPrice}</span>
              </div>
              <button onclick="addSingleSupply('${arr}', ${supplyIndex})" class="btn">+</button>
              </div>`
}

function getDishTemplate(arr, supplyIndex, dishPrice) {
  return `<div class="supply_segment top_bottom_padding site_padding">
  <div class="supply_single">
              <h2>${supply[`${arr}`][supplyIndex].name}</h2>
              <span class="price">${dishPrice}</span>
            </div>
            <button onclick="addSingleSupply('${arr}', ${supplyIndex})" class="btn">+</button>
            </div>`
}

function getSingleTemplate(basketIndex,  dishPrice) {
  return `<div class="single_supply">
              <h3>${basket[basketIndex].name}</h3>
              <div class="cart_item">
                <button onclick="removeDish(${basketIndex})" class="btn">-</button>
                <span>${basket[basketIndex].amount}</span>
                <button onclick="addDish(${basketIndex})" class="btn">+</button>
                <span>${dishPrice}</span>
                <button onclick="deleteDish(${basketIndex})" class="btn trash_btn"><img src="./assets/icons/icons8-mülleimer.svg" alt="trashbin" class="trash_bin">
                </button>
              </div>`
}
