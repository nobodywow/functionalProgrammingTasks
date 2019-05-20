var ingredientsKey = { meat: 'meat', cheese: 'cheese', mushrooms: 'mushrooms'};

function Pizza(ingredients) {
    this.ingredients = ingredients;
    this.squareCmPrice = 10;
    this.ingredientsPrice = { meat: 10, cheese: 5, mushrooms: 15 };
    this.percentage = 5;
    this.totalPrice = function() {    
        var pizzaArea = this.area();
        var ingredientsPriceSum = this.ingredients.reduce((accum, item) => {       
            return this.ingredientsPrice.hasOwnProperty(item) ? accum + this.ingredientsPrice[item] : accum;
        }, 0);
        return ((pizzaArea * this.squareCmPrice) + ingredientsPriceSum) * this.percentage / 100 + (pizzaArea * this.squareCmPrice) + ingredientsPriceSum;
    }    
}

function SquaredPizza(sideLength, ingredients) {
    Pizza.call(this, ingredients);
    this.sideLength = sideLength;
    this.ingredients = ingredients;
    this.area = function() {
        return this.sideLength * this.sideLength;
    };
}

function CircledPizza(diameter, ingredients) {
    Pizza.call(this, ingredients);
    this.diameter = diameter;
    this.ingredients = ingredients;
    this.area = function () {
        return (this.diameter * this.diameter * Math.PI) / 4;
    };
}

var pepperoniSquared = new SquaredPizza(10, [ingredientsKey.meat, ingredientsKey.mushrooms]);
var pepperoniCircled = new CircledPizza(10, [ingredientsKey.meat, ingredientsKey.cheese]);

pepperoniSquared.totalPrice();


