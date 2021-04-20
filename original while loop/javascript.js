class donutShop {
  inventory;
  revenue;
  order;
  
  
	constructor(inventory, revenue, order) {
    this.inventory = inventory;
    this.revenue = revenue;
    this.order = order;
  }
	
	addDonutsByType(donutType, donutCount){
		this.inventory = this.inventory.map(function(donut){
			if(donutType === donut.type){
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
    this.price = price;
  }
}

let DonutShop = new donutShop([new Donut('creme filled', 3, 2), new Donut('plain', 2, 1)], [''],['']);


var input;
// inventory needs to be a class with in that has donut name and price

while(input !== '6'){
  input = prompt( `Please make a selection:
1. Print donut inventory / donut prices
2. Print revenue
3. Create new donut type
4. Add donuts to Inventory
5. Place customer order
6. Quit` );
  if (input === "1"){
  DonutShop.inventory.forEach(function(donut){
    alert(`This is the inventory:
    type: ${donut.type}
    price: ${donut.price.toLocaleString('en-us',{ style: 'currency', currency: 'usd'})}
    count: ${donut.count}`);
  }); 
} else if (input === "2"){
  DonutShop.inventory.forEach(function(donutCost){
    alert(`This is the inventory:
    price: ${donutCost.price * DonutShop.order[2]}`);
  }); 
} else if (input === "3"){
  let type = prompt( `What type of donut is it?` );
  let price = prompt( `How much does it cost?` );
	DonutShop.inventory.push(new Donut(type, 0, Number.parseInt(price)));
} else if (input === "4"){
  let type = prompt ( `What type of donut do you want to add more of?	 
		${JSON.stringify(DonutShop.inventory)}` );
  let number = prompt ( `How many do you want to add?` ); // adds to order
	DonutShop.addDonutsByType(type, parseInt(number))
} else if (input === "5"){
  DonutShop.order.push(prompt( `What type of donut does customer want?
  ${JSON.stringify(DonutShop.inventory)}` ));
  DonutShop.order.push(Number.parseInt(prompt( `How many do they want?` )));
  alert ( DonutShop.order);
}
}