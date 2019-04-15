function Pizzabot() {
}

/**
 * Returns the delivery instructions, in a string format, required to drop off the pizzas in the correct locations
 * @param coordinates
 */
Pizzabot.prototype.deliveryInstructions = function(coordinates) {
    // text to display
    let displayText = '';

    // an array containing a list of delivery instructions.
    let deliveryInstructionsArray = [];

    // remove the right brace from the inputted string of coordinates and grid size.
    let coordsRemoveRightBrace = coordinates.replace(/[&\/\\#+)$~%.'":*?<>{}]/g,'');

    // uses the coordsRemoveRightBrace string to create an array of the grid size and coordinates,
    // using '(' as the separator value,
    let coordinatesStringArray = coordsRemoveRightBrace.split("(");

    // retrieve only the grid size from the inputted string by removing the first element of the coordinatesStringArray.
    let gridSizeString = coordinatesStringArray.shift();

    // calls the extractNumbers method with the gridSizeString string which returns an array containing the grid size
    let gridArray = extractNumbers(gridSizeString, "x");

    // checks if the grid array contains valid numbers.
    let gridValid = validateGridSizeArray(gridArray);

    if (gridValid) {
        // an array to contain arrays of coordinates which should be of type number not string
        let coordinatesArray = [];

        // calls the extractNumbers method for every item in the coordinatesStringArray using ',' as a delimiter.
        // It then pushes the returned array, now of type number, to the coordinatesArray array.
        coordinatesStringArray.forEach(coordinatesString => {
            // checks if the singleCoordinateArray is valid before pushing it to the coordinatesArray
            let singleCoordinateArray = extractNumbers(coordinatesString, ",");
            if (validateCoordinates(singleCoordinateArray, gridArray)) {
                coordinatesArray.push(singleCoordinateArray);
            } else {
                console.log(coordinatesString, " is not valid.")
            }
        });

        // calls the createDeliveryInstructions method which returns an array of instructions.
        deliveryInstructionsArray = createDeliveryInstructions(coordinatesArray);

        // creates a string of delivery instructions by removing all the unnecessary characters from the deliveryInstructionsArray
        displayText = "The delivery instructions for PizzaBot are:: " + deliveryInstructionsArray.toString().replace(/[&\/\\,#+()$~%.'":*?<>{}]/g,'');
    } else {
        displayText = "The Grid is not valid.";
    }

    // checks if there were no valid coordinates and updates the displayText variable to reflect this.
    if (deliveryInstructionsArray.length === 0 && gridValid) {
        displayText = "There were no valid coordinates to drop pizzas off at.";
    }

    // logs out the delivery instructions string
    console.log(displayText);
};

/**
 * Reads in the array of array of coordinates and uses this to determine the instructions to drop off the pizzas in an array format
 * @param gridDropPoints
 * @returns {Array}
 */
function createDeliveryInstructions(gridDropPoints) {
    // an array which will contain all the delivery instructions
    let deliveryArray = [];

    // origin point from where the PizzaBot will start, this will get updated after every drop.
    let originPoint = [0, 0];

    gridDropPoints.forEach(dropPoint => {
        // number variables for the different moving instructions
        let eastMoves, westMoves, northMoves, southMoves = 0;

        // loops through every item in the gridDropPoints array and determines how many east or west movements are
        // required to drop off an item based on the origin point.
        if (dropPoint[0] > originPoint[0]) {
            eastMoves = dropPoint[0] - originPoint[0];
        } else if (dropPoint[0] < originPoint[0]) {
            westMoves = originPoint[0] - dropPoint[0]
        } else if (dropPoint[0] === originPoint[0]){
            westMoves = 0;
            eastMoves = 0;
        }

        // loops through every item in the gridDropPoints array and determines how many north or south movements are
        // required to drop off an item based on the origin point.
        if (dropPoint[1] > originPoint[1]) {
            northMoves = dropPoint[1] - originPoint[1];
        } else if (dropPoint[1] < originPoint[1]) {
            southMoves = originPoint[1] - dropPoint[1]
        } else if (dropPoint[1] === originPoint[1]){
            northMoves = 0;
            southMoves = 0;
        }

        // pushes the appropriate letter to the deliveryArray the number of times stated from the above variables.
        for (let i = 0; i < eastMoves; i++) {
            deliveryArray.push("E");
        }
        for (let i = 0; i < westMoves; i++) {
            deliveryArray.push("W");
        }
        for (let i = 0; i < northMoves; i++) {
            deliveryArray.push("N");
        }
        for (let i = 0; i < southMoves; i++) {
            deliveryArray.push("S");
        }

        // pushes "D" to the array once all navigation instructions have been pushed
        deliveryArray.push("D");

        // update the originPoint with the latest drop off point.
        originPoint = dropPoint;
    });

    return deliveryArray;
}

/**
 * Extracts only the numbers from an inputted string and uses a passed in delimiter to split the string,
 * it then converts the string into an array of numbers.
 * @param numbersString
 * @param delimiter
 * @returns {Array}
 */
function extractNumbers(numbersString, delimiter) {
    return numbersString.split(delimiter).map(Number);
}

/**
 * Returns false if any items in the array is not a number.
 * @param gridArray
 * @returns {boolean}
 */
function validateGridSizeArray(gridArray) {
    let validGrid = true;
    gridArray.forEach(gridItem => {
        if (isNaN(gridItem)) {
            validGrid = false;
        }
    });
    return validGrid;
}

/**
 * Returns false if any of the coordinates are not a number OR the coordinates are outside the grid size.
 * @param coordinateArray
 * @param gridArray
 * @returns {boolean}
 */
function validateCoordinates(coordinateArray, gridArray) {
    let validCoordinate = true;

    // validates that the items in the coordinateArray are numbers
    coordinateArray.forEach(coordinate => {
        if (isNaN(coordinate)) {
            validCoordinate = false;
        }
    });

    // validates that the items in the coordinateArray are within the grid size.
    if ((coordinateArray[0] > gridArray[0] || coordinateArray[0] < 0) ||
        (coordinateArray[1] > gridArray[1] || coordinateArray[1] < 0)) {
        validCoordinate = false;
    }

    return validCoordinate;
}

module.exports = Pizzabot;