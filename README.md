# Delphe

You can find the deployed project at [Delphe App](https://flamboyant-blackwell-be93e6.netlify.com).

## Contributors


|                                       [Josh Akeman](https://github.com/joshakeman)                                        |                                       [Kermitt Davis](https://kermittdavis.com)                                        |                                       [Amarachi Ejiawoko](https://github.com/AmarachiOE)                                        |                                       [Chad Kidd](https://github.com/Chad-Kidd)                                        |                                       [Lydia Thornton](https://github.com/Lydster)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://avatars2.githubusercontent.com/u/18644403?s=400&v=4" width = "200" />](https://github.com/joshakeman)                       |                      [<img src="https://media.licdn.com/dms/image/C5603AQHjaCiEEWY1kw/profile-displayphoto-shrink_800_800/0?e=1567036800&v=beta&t=ePpQRtGnX6EonJD6QMS-zhDhgKRWzBVvgVKn0GnONLc" width = "200" />](https://kermittdavis.com)                       |                      [<img src="https://avatars0.githubusercontent.com/u/36435705?s=460&v=4" width = "200" />](https://github.com/AmarachiOE)                       |                      [<img src="https://avatars3.githubusercontent.com/u/47532308?s=460&v=4" width = "200" />](https://github.com/Chad-Kidd)                       |                      [<img src="https://avatars2.githubusercontent.com/u/34220889?s=460&v=4" width = "200" />](https://github.com/Lydster)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/joshakeman)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/AmarachiOE)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Chad-Kidd)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Lydster)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/joshakeman/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kermitt/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://linkedin.com/in/amarachiejiawoko) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/lydia-thornton/) |

<br>
<br>

<!-- 🚫 4️⃣ Optional examples of using images with links for your tech stack, make sure to change these to fit your project -->

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Typescript](https://img.shields.io/npm/types/typescript.svg?style=flat)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b5c4db1c-b10d-42c3-b157-3746edd9e81d/deploy-status)](nhttps://flamboyant-blackwell-be93e6.netlify.com)
![Material UI](https://img.shields.io/badge/UI%20Framework-Material%20UI-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<!-- 
🚫 more info on using badges [here](https://github.com/badges/shields) -->

## Project Overview

- [Trello Board](https://trello.com/b/Te0Wlxw8/labs-13-niyon)

- [Product Canvas](https://docs.google.com/document/d/1U-0IHm3Xjr8xTkZNnBmfoYik_bXY3XcOJLp_oQKKrcE/edit?usp=sharing)

- [UX Design files](https://projects.invisionapp.com/d/main/default/#/console/17742672/367880901/preview) 


Advice: we all need it in all domains of life and we all give it. But sometimes, maybe most times – at a crossroad, or dilemma, or embarrassing life situation, or when we’re stuck – we need a REAL person to talk to. And after all that we learn through our experiences, we become experts in a few areas and get to help others.

Delphe creates room for an online global community just for you to connect with, and only one ask away! You can sign up to be an asker or an expert, and beginning getting the answers you need or answer questions by topics you know well! 

_"Creating a community for knowledge seekers to connect with experts in a variety of fields."_


### Key Features

-    Post Questions
-    Edit Questions
-    Delete Questions
-    Post Answers
-    Edit Answers
-    Delete Answers
-    Find Questions by Topic
-    View a Community Thread of Questions
-    View Your Profile and Other Users

## Tech Stack

### Front end built using:

#### React JS


-    Allows application creating using multiple reusable components to cater to multiple users 
-    Improves efficiency and scalability of application

#### Material UI
-    Provided a solid design framework for application
-    Provided reusable and customizable components


#### Front end deployed to Netlify

#### [Back end](https://github.com/labs13-delphe/backend) deployed to Heroku and built using:

#### Node JS + Express

-   allows us to build a relational database using knex and sqlite.
-   allows us to create out own middleware wherever neccessary.
-   allows for easy integration with our React app.
-   allows us to create modular, RESTful APIs to call on from our React app.


# APIs -UPDATE

## Firebase

Firebase supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more. For the purposes of our app we limited the types of authenitcation to google and email. We then used part of the google object returned after authenitcation to connect our node.js users table to our authentication for a clean user flow throughout the app. We build out our own backend because Firebase does not support SQL relational databases. 

## Stripe

Stripe is a system that enables a developer to implement a complicated and secure payment infastructure in their app. We strategically integrated stripe into our app for use on a future messenger and zoom integration release of the Delphe product. It would allow experts to request payment for consultation given.

## Websocket (Future Release)

Websocket is a computer communications protocol that allows for duplex communcation channels over a single TCP connection. 

## Zoom (Future Release)

Zoom would allow us to inegrate video conferencing calls into our app for face-to-face consultations between novices and experts for a fee collected through Stripe. 

# 3️⃣ Environment Variables -UPDATE

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:


    *  REACT_APP_API_KEY - this is your Google API key, which can be generated in the Google Cloud Console

    *  REACT_APP_DOMAIN - when you set up your Firebase project, this information will be in the dashboard

    *  REACT_APP_backendURL - optional for your local development 

# 5️⃣ Content Licenses -UPDATE

🚫For all content - images, icons, etc, use this table to document permission of use. Remove the two placeholders and add you content to this table

| Image Filename | Source / Creator | License                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| doodles.png    | Nicole Bennett   | [Creative Commons](https://www.toptal.com/designers/subtlepatterns/doodles/) |
| rings.svg      | Sam Herbert      | [MIT](https://github.com/SamHerbert/SVG-Loaders)                             |

# Testing

The [@testing-library/react](https://testing-library.com/docs/react-testing-library/api) package was used to perform unit tests to ensure specifics for the user interface.

# Installation Instructions

To get the project running locally:

 - Clone this repository.
 - CD into the folder where you downloaded the repository.
 - Run `yarn` or `npm i` to download all dependencies.
 - Type `yarn test` or `npm test` to run the tests. The test script is already configured. 


# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/labs13-delphe/backend/blob/master/README.md) for details on the backend of our project.
