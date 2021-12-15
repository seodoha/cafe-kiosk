function Espresso () {
    this.item = 'espresso';
    this.type = 'hot';
    this.price = 1500;
}

function Water ( beverage ) {
    beverage.price += 300;
    return beverage;
}

function Ice ( beverage ) {
    beverage.price += 300;
    beverage.type = 'ice';
    return beverage;
}


export { Espresso, Water, Ice };