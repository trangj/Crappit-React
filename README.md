# Crappit

A less good version of Reddit developed using Node.js, React, and MongoDB. Users are able to sign up, login and create posts and comment on others. Posts, like in Reddit fashion, can be upvoted or downvoted.

You can play around with a live build of this app [here](https://crappit.netlify.app/)

## Current Features

Crappit currently has these features:

- sign up using email.
- create topics, create posts for each topic, create comments for each post, creat comment trees
- upvote or downvote posts
- browse latest topics and posts within topics
- add topics to your favourites, such that they can be accessed easily from the navbar

## Developing Features

Features currently in development:

- properly obtain hot posts based on number of upvotes
- topic and post moderation

## Installation

Want to run Crappit? Follow these steps:

1. Open up your terminal and install node.js. You can download it [here](https://nodejs.org/en/download/).
2. In your terminal, cd into a directory you want to clone Crappit.
3. Follow the commands below:

```
git clone https://github.com/trangj/Crappit.git
cd Crappit/server
npm i
cd ../client
npm i
```

4. You will need to set up your process variables in order for the app to function, ensure that you have the following variables setup:

```
  mongoURI: "<your mongo uri>"
  jwtSecret: "<your secret>"
  AWS_ACCESS_KEY_ID: "<your aws access id>"
  AWS_SECRET_ACCESS_KEY: "<your aws access key>"
  sendgrid: "<your sendgrid api key>"
```

5. To run the server, enter the command:

```
npm run dev
```

6. Have fun!
