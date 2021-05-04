/* eslint-disable no-console */
/* eslint-disable semi */
const mongoose = require('mongoose');

const deleteSeed = async () => {
  mongoose.connect(
    'mongodb://localhost:27017/react-auth',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    async () => {
      /* Drop the DB */
      await mongoose.connection.db.dropDatabase();
      console.log('Database dropped!');
      process.exit()
    },
  );
};

deleteSeed();
