let http = require("http");
let pizzabot = require('./lib/pizzabot');

// input passed into the command line when running the app
let inputArgument = "";

// obtain the input from the command line
process.argv.forEach(function (val) {
    inputArgument = val;
});

http.createServer(pizzabot.prototype.deliveryInstructions(inputArgument)).listen(8081);