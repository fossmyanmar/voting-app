# Vote Mole

A polling app built for the project "Build a Voting App" for the FreeCodeCamp
curriculum. You can find the live website
[here](https://vote-mole.herokuapp.com/)

![Image of Vote Mole](https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg)

## Installation

`git clone https://github.com/edward-hong/voting-app.git`

or download the
[zipped file](https://github.com/edward-hong/voting-app/archinve/master.zip) and
unzip

## Usage Example

User can choose to vote on existing polls or make their own polls. To vote on
poll, simply click on one of the existing poll questions and select which option
you want to vote for and click the "Submit" button.

To create a poll, first you have to login in. User can login with Facebook,
Google or Github. Once logged in, click "Add Poll" in the navigation bar at the
top and fill out the form and the click "Submit"

![Add poll form](https://res.cloudinary.com/avatarhzh/image/upload/v1511567427/build-a-voting-app/add-poll.png)

Note you must add at least 2 options to the poll.

## Development Setup

After cloning or downloading the repo, type `npm run dev` in the terminal and
the server and client servers will start. Client server is on port 3000, server
side server is on port 5000. To just run server side server, from root directory
type `npm start`. To just run client server, from root directory type `cd client && npm start`

Note that before starting the server the following environment variables should
be defined:

| Variable Name       | Description                                          |
| ------------------- | ---------------------------------------------------- |
| MONGO_URI           | URL of your MongoDB database                         |
| GOOGLE_CLIENT_ID    | Client ID of your Google+ API credentials            |
| GOOGLE_SECRET_KEY   | Corresponding secret key to API credentials          |
| FACEBOOK_CLIENT_ID  | App ID of registered Facebook app                    |
| FACEBOOK_SECRET_KEY | Corresponding secret key to app                      |
| GITHUB_CLIENT_ID    | Client ID of Github OAuth app                        |
| GITHUB_SECRET_KEY   | Corresponding secret key to OAuth app                |
| TWITTER_CLIENT_ID   | Client ID of Twitter app                             |
| TWITTER_SECRET_KEY  | Corresponding secret key to the app                  |
| COOKIE_KEY          | Secret cookie key for login session. Can be anything |

Create a file called `dev.js` in `server/config` directory. Assign an object
with the environment variables to module.exports. The fields of the object
should be in camel case i.e.

```
module.exports = {
	mongoURI: 'your-mongo-url',
	googleClientID: 'your-google-client-id',
	googleSecretKey: 'your-google-secret-key',
	facebookClientID: 'your-facebook-client-id',
	facebookSecretKey: 'your-facebook-secret-key',
	githubClientID: 'your-github-client-id',
	githubSecretKey: 'your-github-secret-key',
	twitterClientID: 'your-twitter-client-id',
	twitterSecretKey: 'your-twitter-secret-key'
	cookieKey: 'your-cookie-key'
}
```

## Meta

Edward Hong – [@EdwardHong527](https://twitter.com/EdwardHong527)

Distributed under the ISC license.

## Contributing

1. Fork it from this [link](https://github.com/edward-hong/voting-app)
2. Create a feature branch `git checkout -b feature/fooBar`
3. Commit your changes `git commit -am 'Add some fooBar`
4. Push to the branch `git push origin feature/fooBar`
5. Create a new Pull Request

## Attribution

The loading spinner was created by Miguel Ambrosi. The code for the spinner was gotten from [https://icons8.com/cssload/en/spinners](https://icons8.com/cssload/en/spinners). Terms of Use: [https://icons8.com/cssload/en/terms_of_use](https://icons8.com/cssload/en/terms_of_use)
