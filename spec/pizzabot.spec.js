describe('Given the Pizzabot', function() {
    let Pizzabot = require('../lib/pizzabot');
    let pizzabot;

    beforeEach(function() {
        pizzabot = new Pizzabot();
    });

    describe('New instance of Pizzabot should be created', function() {
        it('should be created', () => {
            expect(pizzabot).toBeTruthy();
        });
    });

    describe('deliveryInstructions tests', function() {
        it('should set displayText to be Undefined when no arguments are passed in', () => {
            expect(pizzabot.displayText).toBeUndefined();
        });

        it('should set displayText to be "DENNNDEEENDSSDDWWWWSDEEENDWNDEESSD" when a string of 5x5(0,0)(1,3)(4,4)(4,2)' +
            '(4,2)(0,1)(3,2)(2,3)(4,1)' +
            'is passed in', () => {
            let coordinatesInput = '5x5(0,0)(1,3)(4,4)(4,2)(4,2)(0,1)(3,2)(2,3)(4,1)';
            let displayTextResponse = 'The delivery instructions for PizzaBot are:: DENNNDEEENDSSDDWWWWSDEEENDWNDEESSD';
            pizzabot.deliveryInstructions(coordinatesInput);

            expect(pizzabot.displayText).toEqual(displayTextResponse);
        });

        it('should set displayText to be "The Grid is not valid." when a string with an invalid grid size ' +
            '(i.e. 5xg(0,0)(1,3)) is passed in', () => {
            let coordinatesInput = '5xg(0,0)(1,3)';
            let displayTextResponse = 'The Grid is not valid.';
            pizzabot.deliveryInstructions(coordinatesInput);

            expect(pizzabot.displayText).toEqual(displayTextResponse);
        });

        it('should set displayText to be "There were no valid coordinates to drop pizzas off at" when no valid coordinates ' +
            'are passed in the string (i.e. 5x5(test,0)(case,3)) is passed in', () => {
            let coordinatesInput = '5x5(test,0)(case,3)';
            let displayTextResponse = 'There were no valid coordinates to drop pizzas off at.';
            pizzabot.deliveryInstructions(coordinatesInput);

            expect(pizzabot.displayText).toEqual(displayTextResponse);
        });

        it('should remove invalid coordinates and only include instructions for valid coordinates', () => {
            let coordinatesInput = '5x5(0,0)(test,case)(invalid)(4,2)';
            let displayTextResponse = 'The delivery instructions for PizzaBot are:: DEEEENND';
            pizzabot.deliveryInstructions(coordinatesInput);

            expect(pizzabot.displayText).toEqual(displayTextResponse);
        });
    });

    describe('createDeliveryInstructions tests', function() {
        it('should return ["D", "E", "E", "N", "N", "D"] when an array of [[0, 0], [2, 2]] is passed in', () => {
            let gridDropPointsInput = [[0, 0], [2, 2]];
            let deliveryArrayResponse = ['D', 'E', 'E', 'N', 'N', 'D'];

            expect(pizzabot.createDeliveryInstructions(gridDropPointsInput)).toEqual(deliveryArrayResponse);
        });

        it('should return ["D","E","N","N","N","D","E","E","E","N","D","S","S","D","D","W","W","W","W","S","D","E","E".' +
            '"E"."N","D","W","N","D","E","E","S","S","D"] when an array of [[0,0][1,3][4,4][4,2][4,2][0,1][3,2][2,3][4,1]] is passed in', () => {
            let gridDropPointsInput = [[0,0],[1,3],[4,4],[4,2],[4,2],[0,1],[3,2],[2,3],[4,1]];
            let deliveryArrayResponse = ['D','E','N','N','N','D','E','E','E','N','D','S','S','D','D','W','W','W','W',
                'S','D','E','E','E','N','D','W','N','D','E','E','S','S','D'];

            expect(pizzabot.createDeliveryInstructions(gridDropPointsInput)).toEqual(deliveryArrayResponse);
        });

        it('should return ["D", "D"] when an invalid array is passed in', () => {
            let gridDropPointsInput = [["test"], ["case"]];
            let deliveryArrayResponse = ['D', 'D'];

            expect(pizzabot.createDeliveryInstructions(gridDropPointsInput)).toEqual(deliveryArrayResponse);
        });

        it('should return [] when a blank array is passed in', () => {
            let gridDropPointsInput = [];
            let deliveryArrayResponse = [];

            expect(pizzabot.createDeliveryInstructions(gridDropPointsInput)).toEqual(deliveryArrayResponse);
        });
    });

    describe('pushInstructionsToArray tests', function() {
        it('push the letter E to an empty array 5 times', () => {
            let deliveryArray = [];
            let numberOfMoves = 5;
            let instruction = "E";
            let updatedArray = ["E","E","E","E","E"];
            expect(pizzabot.pushInstructionsToArray(deliveryArray, numberOfMoves, instruction)).toEqual(updatedArray);
        });

        it('push the letter N to an existing array 3 times', () => {
            let deliveryArray = ["E","E"];
            let numberOfMoves = 3;
            let instruction = "N";
            let updatedArray = ["E","E","N","N","N"];
            expect(pizzabot.pushInstructionsToArray(deliveryArray, numberOfMoves, instruction)).toEqual(updatedArray);
        });
    });

    describe('extractNumbers tests', function() {
        it('should return an array of only numbers from a passed in string using x to split the string', () => {
            let inputString = "55x56";
            let expectedResponse = [55, 56];
            expect(pizzabot.extractNumbers(inputString, "x")).toEqual(expectedResponse);
        });

        it('should return an array of only numbers from a passed in string using , to split the string', () => {
            let inputString = "55,56";
            let expectedResponse = [55, 56];
            expect(pizzabot.extractNumbers(inputString, ",")).toEqual(expectedResponse);
        });

        it('should return NaN if the passed in delimiter does not exists in the string', () => {
            let inputString = "55,56";
            expect(pizzabot.extractNumbers(inputString, "x")[0]).toBeNaN();
        });

        it('should return NaN if the passed in string cannot be converted to a number', () => {
            let inputString = "testXcase";
            expect(pizzabot.extractNumbers(inputString, "X")[0]).toBeNaN();
        });
    });

    describe('validateGridSizeArray tests', function() {
        it('should return true when a valid number array is passed in', () => {
            let inputArray = [5, 5];
            expect(pizzabot.validateGridSizeArray(inputArray)).toBe(true);
        });

        it('should return false when there is more than 2 items in the array', () => {
            let inputArray = [5, 5, 5];
            expect(pizzabot.validateGridSizeArray(inputArray)).toBe(false);
        });

        it('should return false when any item in the array is not a number', () => {
            let inputArray = [5, "g"];
            expect(pizzabot.validateGridSizeArray(inputArray)).toBe(false);
        });
    });

    describe('validateCoordinates tests', function() {
        it('should return true when a valid coordinateArray and gridArray are passed in', () => {
            let coordinateArray = [5, 5];
            let gridArray = [5, 5];
            expect(pizzabot.validateCoordinates(coordinateArray, gridArray)).toBe(true);
        });

        it('should return false when there is more than 2 items in the coordinateArray', () => {
            let coordinateArray = [5, 5, 6];
            let gridArray = [5, 5];
            expect(pizzabot.validateCoordinates(coordinateArray, gridArray)).toBe(false);
        });

        it('should return false when any item in the coordinateArray is not a number', () => {
            let coordinateArray = [5, 'g'];
            let gridArray = [5, 5];
            expect(pizzabot.validateCoordinates(coordinateArray, gridArray)).toBe(false);
        });

        it('should return false when the first item in the coordinateArray is greater than the first item ' +
            'in the gridArray', () => {
            let coordinateArray = [6, 5];
            let gridArray = [5, 5];
            expect(pizzabot.validateCoordinates(coordinateArray, gridArray)).toBe(false);
        });

        it('should return false when the second item in the coordinateArray is greater than the second item ' +
            'in the gridArray', () => {
            let coordinateArray = [5, 6];
            let gridArray = [5, 5];
            expect(pizzabot.validateCoordinates(coordinateArray, gridArray)).toBe(false);
        });

        it('should return false when both the first and second items in the coordinateArray are greater than the first ' +
            'and second item in the gridArray', () => {
            let coordinateArray = [6, 6];
            let gridArray = [5, 5];
            expect(pizzabot.validateCoordinates(coordinateArray, gridArray)).toBe(false);
        });

    });
});