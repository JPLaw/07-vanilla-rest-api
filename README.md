[![Build Status](https://travis-ci.org/JPLaw/07-vanilla-rest-api.svg?branch=master)](https://travis-ci.org/JPLaw/07-vanilla-rest-api)Lab 07: Vanilla HTTP Server
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Set up Travis CI on your forked repo **if you are writing tests**
* Open a pull request to your master branch.
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration
Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables (should be git ignored)
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint
  * create a `test` script for running tests
  * create a `start` script for running your server
* **.travis.yml** - contains Travis CI configuration
* **lib/** - contains module definitions
* **\_\_test\_\_/** - contains unit tests

## Feature Tasks
For this assignment you will be building a HTTP server.
#### Server Module
The server module is responsible for creating an http server defining all route behavior and exporting an interface for starting and stoping the server. It should export an object with `start` and `stop` methods. The start and stop methods should each return a promise that resolves on success and rejects on error.
###### GET /
When a client makes a GET request to / the server should send back html with a project description and a anchor to /cowsay.
``` html
<!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>
  </head>
  <body>
   <header>
     <nav>
       <ul>
         <li><a href="/cowsay">cowsay</a></li>
       </ul>
     </nav>
   <header>
   <main>
     <!-- project description -->
   </main>
  </body>
</html>
```

###### GET /cowsay?text={message}
When a client makes a GET request to /cowsay?text={message} the server should parse the querystring for a text key. It should then send a rendered HTML page with a cowsay cow speaking the value of the text query. If their is no text query the cow message should be a random string taken from the `Faker` package. Don't know how to use the `Faker` package? Be a resourceful developer and figure it out [here](https://www.npmjs.com/package/faker).
``` html
<!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>
  </head>
  <body>
    <h1> Welcome to Cowsay! </h1>
    <pre>
      <!-- cowsay.say({text: req.query.text}) -->
    </pre>
  </body>
</html>
```

###### GET /api/cowsay?text={message}
When a client makes a GET request to /api/cowsay it should send JSON that includes `{"text": "<message>"}`. The server should respond with a JSON body `{"content": "<cowsay cow saying the message in the query string>"}`.

A response for a valid Requests should have a status code of **200** and the JSON body
``` json
{
  "content": "<cowsay cow saying the message in the query string>"
}
```

A response for a invalid Requests should have a status code of **400** and the JSON body...
```
{
  "error": "invalid request: text query required"
}
```

###### POST /api/cowsay
When a client makes a POST request to /api/cowsay it should send JSON that includes `{"text": "<message>"}`. The server should respond with a JSON body `{"content": "<cowsay cow saying the posted message>"}`.

| Request | Response Status Code | Response Type | Response Body |
| -- | -- | -- | -- |
| With out a body | 400 | JSON | `{"error": "invalid request: body required"}` |
| With out text property on the body | 400 | JSON | `{"error": "invalid request: text query required"}` |
| With text query | 200 | JSON | `{"content": "<cowsay cow text>"}` |

## Tests (up to 3 bonus points)
* Write tests for your `POST /api/cowsay route`, `GET /api/cowsay?text={message} route`, and one more route of your choice. Write at least **two** test assertions for each route. 
* Your `POST /api/cowsay route` and your `GET /api/cowsay?text={message} route` should include tests that check for 400 errors on a bad request. 

## HTTPie commands
* `http GET :3000/pathname text=="judy vue"`
* `http GET :3000/pathname?text=hello`
* `http :3000/pathname?text=hello **defaults to a GET request when no verb is put in**`
* `http POST :3000/pathname name=vincio`

## Documentation
Add your Travis badge to to the top of your README.md **if you are writing tests**. Tell a user how to use your API. List out the routes you have registered and explain the RESTful verbs a user must use to get a valid response. Explain what is received when a valid request is made and what is received when an invalid request is made. 

## Stretch Goals
### Cow Variatons
 * Design and implement a feature to change the cowfile on GET /cowsay, GET /api/cowsay, and POST /api/cowsay - **ex: dragon, sheep, etc**
   * You can find the different type of animals cowsay supports at https://github.com/piuccio/cowsay/tree/master/cows
* This is a design task. You neeed decide how to change your code structure in order to implement the feature.
### Read HTML from a File
 * Use the `fs` module to read from an index.html file in your project instead of hardcoding HTML into your server module. 
### Make More Routes!
 * Create more routes as you see fit. 


