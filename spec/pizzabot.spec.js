describe('Given the Pizzabot', function() {
    let Pizzabot = require('../lib/pizzabot');
    let pizzabot;

    beforeEach(function() {
        pizzabot = new Pizzabot();
    });

    it('Then it contains an add method', function() {
        // pizzabot.test("5x5(0,0)(1,3)(4,4)(4,2)(4,2)(0,1)(3,2)(2,3)(4,1)")
        pizzabot.deliveryInstructions("5x10(0,0)(2,2)(2,2)(70,1)(1,70)(1,1)(not)")
        // pizzabot.deliveryInstructions("5x10(hello)")
        // expect(pizzabot.test("hello")).toBeDefined();
    });


});