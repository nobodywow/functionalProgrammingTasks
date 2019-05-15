var ingredientsKey = { meat: 'meat', cheese: 'cheese', mushrooms: 'mushrooms'};

function Pizza() {};
Pizza.prototype.squareCmPrice = 10;
Pizza.prototype.ingredientsPrice = { meat: 10, cheese: 5, mushrooms: 15 };
Pizza.prototype.percentage = 5;
Pizza.prototype.totalPrice = function() {
    var pizzaArea = this.area();
    var ingredientsPriceSum = this.ingredients.reduce((accum, item) => {
        return this.ingredientsPrice.hasOwnProperty(item) ? accum + this.ingredientsPrice[item] : accum;
    }, 0);
    return ((pizzaArea * this.squareCmPrice) + ingredientsPriceSum) * this.percentage / 100 + (pizzaArea * this.squareCmPrice) + ingredientsPriceSum; 
}

function SquaredPizza(sideLength, ingredients) {
    this.sideLength = sideLength;
    this.ingredients = ingredients;
}
SquaredPizza.prototype = new Pizza();
SquaredPizza.prototype.area = function() {
    return this.sideLength * this.sideLength;
}

function CircledPizza(diameter, ingredients) {
    this.diameter = diameter;
    this.ingredients = ingredients;
}
CircledPizza.prototype = new Pizza();
CircledPizza.prototype.area = function () {
    return (this.diameter * this.diameter * Math.PI) / 4;
}

var pepperoniSquared = new SquaredPizza(10, [ingredientsKey.meat, ingredientsKey.mushrooms]);
var pepperoniCircled = new CircledPizza(10, [ingredientsKey.meat, ingredientsKey.cheese]);

pepperoniSquared.totalPrice();