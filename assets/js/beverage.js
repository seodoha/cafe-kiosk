function Beverage ( name ) {
    this.item = name || 'beverage';
    this.type = 'hot';
    this.price = 1500;
}

function Water ( beverage ) {
    beverage.price += 300;
    return beverage;
}

function Milk ( beverage ) {
    beverage.price += 800;
    return beverage;
}

function Ice ( beverage ) {
    beverage.price += 300;
    beverage.type = 'ice';
    return beverage;
}

function Banilla ( beverage ) {
    beverage.price += 200;
    return beverage;
}

function Caramel ( beverage ) {
    beverage.price += 200;
    return beverage;
}

function Mocha ( beverage ) {
    beverage.price += 200;
    return beverage;
}

export { Beverage, Water, Milk, Ice, Banilla, Caramel, Mocha };