function Pizza() {};
Pizza.prototype.squareCmPrice = 10;
Pizza.prototype.ingridientsPrice = {meat: 10, cheese: 5, mushrooms: 15};
Pizza.prototype.percentage = 5;
Pizza.prototype.totalPrice = function(area, ingridients) {
    var ingridientsSum = ingridients.reduce((accum, item) => {
        return this.ingridientsPrice.hasOwnProperty(item) ? accum + this.ingridientsPrice[item] : accum;
    }, 0);
    return ((area * this.squareCmPrice) + ingridientsSum) * this.percentage / 100 + (area * this.squareCmPrice) + ingridientsSum; 
}

function SquaredPizza(sideLength) {
    this.sideLength = sideLength;
}
SquaredPizza.prototype = Pizza.prototype;
SquaredPizza.prototype.area = function() {
    return this.sideLength * this.sideLength;
}

function CircledPizza(diameter) {
    this.diameter = diameter;
}
CircledPizza.prototype = Pizza.prototype;
CircledPizza.prototype.area = function () {
    return (this.diameter * this.diameter * Math.PI) / 4;
}

var pepperoniCircled = new CircledPizza(20);
var pepperoniSquared = new SquaredPizza(10);

pepperoniSquared.totalPrice(pepperoniSquared.area(), ['meat', 'mushrooms']);