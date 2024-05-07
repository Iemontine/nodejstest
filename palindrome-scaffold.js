/* Code provided by Daryl Posnett at UC Davis */ 

/**
 * Basic Layout of an Express App JavaScript File:
 * ------------------------------------------------
 * 
 * 1. Required Modules:
 * Import necessary modules using 'require'. This typically includes 'express' and may include
 * other middleware libraries needed for request parsing, handling CORS, etc.
 *
 * Example:
 * const express = require('express');
 * const bodyParser = require('body-parser');  // For parsing application/json
 *
 * 2. App Initialization:
 * Create an instance of express, which serves as the central app object used to configure the server.
 *
 * Example:
 * const app = express();
 *
 * 3. Middleware Configuration:
 * Middleware functions are used to perform operations on request and response objects before they
 * reach route handlers. This section includes middleware for parsing request bodies, serving static files,
 * and other preprocessing tasks.
 *
 * Examples:
 * app.use(bodyParser.json());
 * app.use(express.static('public'));
 *
 * 4. Routes and Route Handlers:
 * Define routes that determine how different HTTP requests should be handled. Each route can have one or
 * more handler functions that process requests and send responses.
 *
 * Example:
 * app.get('/', homePageHandler);
 * app.post('/data', dataHandlingFunction);
 *
 * 5. Error Handling:
 * Setup middleware for handling errors. This is typically placed after all routes and other middleware to
 * catch any errors that occur during request handling.
 *
 * Example:
 * app.use(errorHandler);
 *
 * 6. Server Activation:
 * Configure the server to listen on a specific port. Include a callback to confirm the server is running.
 *
 * Example:
 * const port = 3000;
 * app.listen(port, () => console.log(`Listening on port ${port}...`));
 *
 * 7. Support Functions:
 * Define any support functions that are used within route handlers to perform specific tasks such as data
 * validation, database interactions, or complex business logic. These functions help modularize the code
 * and are placed at the bottom for readability.
 *
 * Example:
 * function homePageHandler(req, res) {
 *   res.send('Welcome to the Home Page!');
 * }
 *
 * function dataHandlingFunction(req, res) {
 *   validateRequest(req);
 *   processData(req.body);
 *   res.send('Data processed successfully');
 * }
 *
 * function errorHandler(err, req, res, next) {
 *   console.error(err.stack);
 *   res.status(500).send('Something broke!');
 * }
 *
 */

const express = require('express');
const port = 8097; 

// Create an Express application
const app = express();

/**
 * Middleware in Express:
 * ----------------------
 * Middleware functions are functions that have access to the request object (req), 
 * the response object (res), and the next function in the application's request-response cycle. 
 * The next function is a function in the Express router which, when invoked, executes the middleware 
 * succeeding the current middleware.
 *
 * Middleware functions can perform the following tasks:
 * - Execute any code.
 * - Make changes to the request and the response objects.
 * - End the request-response cycle.
 * - Call the next middleware in the stack.
 *
 * If the current middleware does not end the request-response cycle, it must call next() 
 * to pass control to the next middleware function. Otherwise, the request will be left hanging.
 *
 * Middleware can be used for a wide variety of tasks, such as:
 * - Executing any code that needs to run before a request is handled.
 * - Making modifications to the request and response objects (e.g., adding headers, parsing cookies).
 * - Ending the request-response cycle (e.g., returning a response).
 * - Logging, authenticating users, handling errors, and more.
 *
 * In an Express app, middleware is typically added using the app.use() and app.METHOD() functions, where
 * METHOD is the HTTP method (like get, post, put, delete) corresponding to the requests the middleware should handle.
 *
 * Example of using middleware:
 * app.use(express.static('public'));  // Serves static files from 'public' directory
 * app.use(express.json());           // Parses incoming requests with JSON payloads
 */

// Middleware for serving static files from 'public' directory
app.use(express.static('public'));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Routes
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Route that handles GET requests to '/query', processed by queryHandler
app.get('/query', queryHandler);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Error Handling
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Middleware for handling cases where no other middleware or route handled the request
app.use(fileNotFound);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Server Activation
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Start the server on the specified port and log a message to the console
app.listen(port, function () {
    console.log('Listening...');
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Support functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//`````````````````````````````````````````````````````````````````````````````````
// Handler function for specific query requests
//
function queryHandler(req, res, next) {
    
    let url = req.url;          // Accessing the URL of the request
    let qObj = req.query;       // Extracting the query parameters from the request
    console.log(qObj);          // Logging the query object to the console


    // If the query contains the key 'animal', respond with JSON
    if (qObj.animal != undefined) {
        res.json({"beast": qObj.animal});
    } else {
        // If not handled, pass to the next handler in the stack
        next();
    }
}

//`````````````````````````````````````````````````````````````````````````````````
// Handler function for cases where no appropriate file or route is found
//
function fileNotFound(req, res) {
    // Accessing the URL of the request that caused the error, sethe content 
    // type of the response to plain text, set the status code of the response 
    // to 404 (Not Found), and send a plain text message indicating the file 
    // was not found
    //
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find ' + url);
}


