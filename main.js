let i = 0;
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" style=" pointer-events: none" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`;

const renderToDom = (divId, content) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = content;
};

const tableHTML = `
<div id=addRow><button id="add-row-button">Add Item</button></div>
<form id="product-list-form">
<table id="product-list-table">
  <tr id="header">
    <th>Product</th>
    <th>Quantity</th>
    <th>Price</th>
    <th></th>
  </tr>
  </table>
  <div id="submit-button-div"><button id="submitButton" type="submit">Submit</button></div>
  <div id="total-amount"></div>
  <div id="products-array"></div>
  </form>
  `;

renderToDom('app', tableHTML);
const form = document.getElementById('product-list-form');
const table = document.getElementById('product-list-table');

//ADD ROW TO TABLE WHEN ADD ROW BUTTON IS PRESSED
addRow = () => {
  const row = table.insertRow(-1);
  row.setAttribute('id', `product--${i}`, 0);
  const th1 = row.insertCell(0);
  const th2 = row.insertCell(1);
  const th3 = row.insertCell(2);
  const th4 = row.insertCell(3);
  th1.innerHTML = `<input id="product-name--${i}" type="text" placeholder="Product" required/>`;
  th2.innerHTML = `<input id="product-quantity--${i}" type="number" placeholder="Quantity" required/>`;
  th3.innerHTML = `<input id="product-price--${i}" type="number" step="0.01" placeholder="Price" required/>`;
  th4.innerHTML = `<button id="delete-button--${i}">${deleteIcon}</button>`;
};

//CREATE AN ARRAY OF PRODUCT OBJECTS WHEN SUBMIT BUTTON IS PRESSED
const productsArray = () => {
  const productsArray = [];
  for (x = 1; x <= i; x++) {
    const product = {
      name: document.getElementById(`product-name--${x}`).value,
      quantity: document.getElementById(`product-quantity--${x}`).value,
      price: document.getElementById(`product-price--${x}`).value,
    };
    productsArray.push(product);
  }
  return productsArray;
};

//CALCULATE THE TOTAL AMOUNT OF THE ORDER WHEN SUBMIT BUTTON IS PRESSED
const calculateTotalAmount = (productsArray) => {
  totalCostsArray = [];
  productsArray.forEach((product) => {
    const cost = product.price * product.quantity;
    totalCostsArray.push(cost);
    totalCost = totalCostsArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  });
  return totalCost;
};

//REFORMAT THE TABLE IDS WHEN DELETE BUTTON IS PRESSED
const reformatTableIds = () => {
  let r = 0;
  for (x = 1; x <= i; x++) {
    if (document.getElementById(`product-name--${x}`)) {
      r++;
      document
        .getElementById(`product-name--${x}`)
        .setAttribute('id', `product-name--${r}`, 0);
      document
        .getElementById(`product-quantity--${x}`)
        .setAttribute('id', `product-quantity--${r}`, 0);
      document
        .getElementById(`product-price--${x}`)
        .setAttribute('id', `product-price--${r}`, 0);
    }
  }
};

app.addEventListener('click', (e) => {
  //ADD ITEM BUTTON
  if (e.target.id === 'add-row-button') {
    i++;
    addRow();
    document.getElementById('total-amount').innerHTML = '';
  }
  //DELETE ROW BUTTON
  if (e.target.id.includes('delete-button')) {
    if (i > 0) {
      const [, rowNumber] = e.target.id.split('--');
      const thisRow = document.getElementById(`product--${rowNumber}`);
      thisRow.remove();
      reformatTableIds();
      document.getElementById('total-amount').innerHTML = '';
      i--;
    }
  }
});

app.addEventListener('submit', (e) => {
  //SUBMIT BUTTON
  if (e.target.id === 'product-list-form' && i > 0) {
    e.preventDefault();
    const productsArrayData = productsArray();
    const totalCost = calculateTotalAmount(productsArrayData);
    document.getElementById(
      'total-amount'
    ).innerHTML = `Total Amount: ${totalCost.toFixed(2)}`;
    //DATA FOR FIREBASE-->
    console.log(productsArrayData);
    console.log(totalCost);
  }
});
