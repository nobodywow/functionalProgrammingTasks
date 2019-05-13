function Pizza() {
    this.squareCmPrice = 10;
    this.ingridientsPrice = {meat: 10, cheese: 5, mushrooms: 15};
    this.percentage = 5;
    this.totalPrice = function(area, ingridients) {    
        var ingridientsSum = ingridients.reduce((accum, item) => {       
            return this.ingridientsPrice.hasOwnProperty(item) ? accum + this.ingridientsPrice[item] : accum;
        }, 0);
        return ((area * this.squareCmPrice) + ingridientsSum) * this.percentage / 100 + (area * this.squareCmPrice) + ingridientsSum;
    }    
}

function SquaredPizza(sideLength) {
    Pizza.call(this);
    this.sideLength = sideLength;
    this.area = function() {
        return this.sideLength * this.sideLength;
    };
}

function CircledPizza(diameter) {
    Pizza.call(this);
    this.diameter = diameter;
    this.area = function () {
        return (this.diameter * this.diameter * Math.PI) / 4;
    };
}

var pepperoniSquared = new SquaredPizza(10);
var pepperoniCircled = new CircledPizza(20);
pepperoniSquared.totalPrice(pepperoniSquared.area(), ['meat', 'cheese']);


