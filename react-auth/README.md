# React Auth
This mobile-responsive chat app was built as a personal project to practice and learn React with Hooks & Context, Node & Express, websockets, testing with Jest and Cypress and setting up a CI/CD pipeline.\
\
Users can sign up and chat with multiple people after being redirected to the home route.  The avatar in the login screen is dynamic, and changes with every refresh.

<img width="1652" alt="Screen Shot 2020-02-10 at 10 24 17 AM" src="https://user-images.githubusercontent.com/44601888/74114811-96f30f80-4bef-11ea-87a7-ca4e9c05e6d5.png">



## Installing

####  ```npm i```
In your clone (or fork) server (backend) directory, run ```npm i``` to install all necessary dependencies. After doing this, ```cd client``` and do the same for the client (frontend) directory.

#### Environment Variable Setting

Below are the list of the environment variables that you need to configure before being able to run this program:

Server .env variables:

| Variable name | Example value | Explanations / Notes |
| :--: | :--: | :-- |
| PORT | 4000 | The port being used by the server |
| MONGO_URL | mongodb://127.0.0.1:27017 | The url for your MongoDB instance. You are free to choose between a local Mongo instance, a cloud-based one or a Docker container |
| SECRET | asdfasdhbrqwkehrgqlwke | jwt secret; this can be any random value |

Client .env variables:

| Variable name | Example value | Explanations / Notes |
| :--: | :--: | :-- |
| REACT_APP_WS_URL | wss://192.168.1.165:8080 | This is the URL of your websocket instance. If running locally, set it as ```wss://<your local url>:8080``` |

## Running the tests

I have configured 2 types of frontend tests for this project - Unit testing with Jest and e2e testing with Cypress.

#### Unit testing - Jest
```cd client``` and enter the client directory. In the client directory, enter the ```npm run test``` command.\
If you decide to change some of the source code, please update the snapshots with the ```npm run test -- -u```.

#### End to End testing - Cypress
In order to configure testing for e2e, open the ```seeder.js``` file in the server directory and change the databaseURL to your own test MongoDB.\
After doing this, change the server environment variable of MONGO_URL to that of your test DB.

1. In the server directory, run ```npm run seed``` to start seeding the database.
2. ```cd client``` and run ```npx cypress open``` to open the Cypress GUI and run all tests.
3. ```cd ..``` and run ```npm run clean``` to erase the test DB.

## Deployment

There are many different methods you can use to deploy this project. You can seperate the client and server directories and deploy them in 2 different instances with a seperate MongoDB instance running, or you can do what I did and use Heroku to deploy the server and client in one single instance.

https://blog.heroku.com/six-strategies-deploy-to-heroku \
I used the GitHub Integration method, and set up GitHub Actions for my CI and configured Heroku to prevent deployments when the tests in the CI stage fail.

## Built With

* [React](https://github.com/facebook/react)
* [StyledComponents](https://github.com/styled-components/styled-components)
* [NodeJS](https://github.com/nodejs/node)
* [Express](https://github.com/expressjs/express)
* [ws](https://github.com/websockets/ws)
* [Jest](https://github.com/facebook/jest)
* [Cypress](https://github.com/cypress-io/cypress)

## Authors

* **Soo Hwan Kim** - *Initial work* - [josephk96](https://github.com/josephk96)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://github.com/avasconcelos114, my mentor, for helping me with the many issues I faced when creating this app.
