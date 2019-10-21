// import everything from express and assign it to the express variable
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {Sequelize} from 'sequelize-typescript';

import {Customer} from './models/customer.model';
import {CustomerController} from './controllers/customer.controller';
import {Provider} from './models/provider.model';
import {ProviderController} from './controllers/provider.controller';

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([Customer, Provider]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// define the port the express app will listen on
var port: number = 3001;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/customer', CustomerController);
app.use('/provider', ProviderController);


sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
