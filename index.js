export class donutShop {
    inventory;
    revenue;
    order;
  
    constructor(inventory, revenue, order) {
      this.inventory = inventory;
      this.revenue = revenue;
      this.order = order;
    }
  
    addDonutsByType(donutType, donutCount) {
      this.inventory = this.inventory.map(function (donut) {
        if (donutType === donut.type) {
          donut.count += donutCount;
        }
        return donut;
      });
    }
  }
  
  class Donut {
    type;
    amount;
    price;
  
    constructor(type, count, price) {
      this.type = type;
      this.count = count;
      // this.price = price;
      // this.revenue = 0;
    }
  }
  
  export let DonutShop = new donutShop(
    [new Donut()],
    []
  );
   
  
  
  function getInput() {
     let input = prompt(`Please make a selection:
  1. Print donut inventory / donut prices
  2. Print revenue
  3. Create new donut type
  4. Add donuts to Inventory
  5. Place customer order
  6. Quit`);
     if (input !== null) {
       processInput(input);
     }
   }
   
   function processInput(response) {
     if (response === '1') {
       fetch("https://donutshop-api.herokuapp.com/inventory?id=234", {
         method: "GET"
       })
         .then(response => response.json())
         .then(data => {
           DonutShop.inventory.push(data)
           alert(JSON.stringify(data.donuts));
           console.log(data);
           getInput();
         })
         .catch(err => {
           console.error(err);
         });
     }
     else if (response === '2') {
       fetch("https://donutshop-api.herokuapp.com/revenue?id=234", {
         method: "GET"
       })
         .then(response => response.json())
         .then(data => {
           alert(`Dank Donuts Revenue:$${JSON.stringify(data.revenue)}`);
         console.log(data);
           getInput();
         })
         .catch(err => {
           console.error(err);
         });
     }
     else if (response === '3') {
      let type = prompt(`What type of donut is it?`);
      let price = prompt(`How much does it cost?`);
      DonutShop.inventory.push(new Donut(type, Number.parseInt(price)));
      fetch("https://donutshop-api.herokuapp.com/create-donut-type?id=234", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(new Donut(type, price))
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
       getInput()
    .catch((err) => {
      console.error(err);
    });
  
    }else if (response === '4') {
      let type = prompt(`What type of donut do you want to add more of?
          ${JSON.stringify(DonutShop.inventory)}`);
      let number = prompt(`How many do you want to add?`); // adds to order
      DonutShop.addDonutsByType(type, number);
      fetch("https://donutshop-api.herokuapp.com/add-donuts?id=234", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(new Donut(type, number))
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
      getInput()
    // .catch((err) => {
    //   console.error(err);
    // });
    }else if (response === '5') {
      let type = prompt(`What type of donut does customer want?
          ${JSON.stringify(DonutShop.inventory)}`);
      let number = prompt(`How many do they want?`);
      fetch("https://donutshop-api.herokuapp.com/place-order?id=234", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(new Donut(type, number))
  })
    .then((response) => response.json())
    .then((data) => {
     console.log('data for /place order: ', data)
     getInput()
         })
    .catch((err) => {
      console.error(err);
    });
  
  }else {
       return;  // quit option
     }
   }
   
   getInput();