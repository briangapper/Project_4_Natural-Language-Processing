# Natural-Language-Processing WebApp

## Description

This website uses Natural Language Processing (NLP) technology to evaluate the sentiment of a text. The user has the possibility to pass a URL that leads to a blog or more generally to any text, which is then evaluated. NLP is a technology that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us. Understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. Wikipedia defines NLP as following:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.

Typically, NLP programs require far more resources than individuals have access to. The MeaningCloud platform has put a public facing API in front of their NLP system. This project uses it to determine various attributes of an article, blog post, or other form of text-based content.

## Getting started

This project contains a build-tool implementation called **webpack**. For this project to run properly, it is recommended that we first build the project as a build-tool and then run it. To do this, we first need to install all dependencies that are required for this project to function. After navigating to the root directory of the project, enter the following command in your terminal:
```bash
npm install
```
Once all packages have been installed, you can perform a test run to make sure everything is working properly. Use the following command in your terminal for the test run:
```bash
npm run test
```
If the test was successful, it is now time to build our webpack. Use the following command which should create a folder **dist/prod** in your root folder structure together with a *main.js* file.
```bash
npm run build-prod
```
Now you can start the server, open a browser and connect to *http://localhost:9000*. To start the server, type the following command in your terminal:
```bash
npm run start
```
## Usage

The usage of this app is very simple. Just search for a blog post / article / or any other type of text-based content, copy the URL and paste it into the web app. Click on the 'Analyze' button and you will see some attributes displayed once the API has analyzed the text and returned and appropriate evaluation of the sentiment.

## Meaning of attributes
The result will consist of five different attributes:

| Attribute | Meaning |
| ----------|-----------|
| Status  | Shows if the API request has been successful |
| Polarity | Indicates whether the text communicates a rather positive or negative message (value is either N or P) |
| Subjectivity | Marks the subjectivity of the text (value is either Objective or Subjective) |
| Confidence | Represents the confidence associated with the sentiment analysis performed on the text (integer value from 0 - 100) |
| Text | A sentence that appears in the analyzed URL |

### Step 2: Install the SDK
Next you'll need to get the SDK. SDK stands for Software Development Kit, and SDKs are usually a program that brings together various tools to help you work with a specific technology. SDKs will be available for all the major languages and platforms, for instance the Aylien SDK brings together a bunch of tools and functions that will make it possible to interface with their API from our server and is available for Node, Python, PHP, Go, Ruby and many others. We are going to use the Node one, the page is available [here](https://docs.aylien.com/textapi/sdks/#sdks). You get 1000 free requests per day.

### Step 3: Require the SDK package
Install the SDK in your project and then we'll be ready to set up your server/index.js file.

Your server index.js file must have these things:

- [ ] Require the Aylien npm package
```
var aylien = require("aylien_textapi");
```

### Step 4: Environment Variables
Next we need to declare our API keys, which will look something like this:
```
// set aylien API credentias
var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});
```

...but there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
API_ID=**************************
API_KEY=**************************
```
- [ ] Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```
console.log(`Your API key is ${process.env.API_KEY}`);
```
...Not that you would want to do that. This means that our updated API credential settings will look like this:
```javascript
// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary. 
// You could call it aylienapi, nlp, or anything else, 
//   just make sure to make that change universally!
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
```

### Step 5: Using the API

We're ready to go! The API has a lot of different endpoints you can take a look at [here](https://docs.aylien.com/textapi/endpoints/#api-endpoints). And you can see how using the SDK simplifies the requests we need to make. 

I won't provide further examples here, as it's up to you to create the various requests and make sure your server is set up appropriately.

## After the Aylien API

Once you are hooked up to the Aylien API, you are most of the way there! Along with making sure you are following all the requirements in the project rubric in the classroom, here are a few other steps to make sure you take.

- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements.
- Go back to the web pack config and add the setup for service workers.
- Test that the site is now available even when you stop your local server

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.