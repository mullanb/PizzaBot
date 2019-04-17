# Pizzabot!

## Download code and install dependencies 

Clone down the project and run npm install to install all the dependencies

## Build Scripts

1) `npm run pizzabot` - this command will run - node server.js '5x5(0,0)(1,3)(4,4)(4,2)(4,2)(0,1)(3,2)(2,3)(4,1)' - this is the input string specified in the spec
2) `npm run server` + string - this command will run - node server.js - please specify an input string, i.e. `npm run server "5x5"(0,0)(4,4)(1,3)"`

## Build Scripts for Jasmine unit test

1) `npm run jasmine` - this command will run - node_modules/.bin/jasmine - this will run all the existing jasmine unit tests.

The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Notes
1) The main javascript file is `pizzabot.js` and is located in the `/lib` folder.
2) The jasmine test file is `pizzabot.spec.js` and is located in the `/spec` folder.
3) The server file is `server.js` and is located in the root of the project.

# Pizzabot!


