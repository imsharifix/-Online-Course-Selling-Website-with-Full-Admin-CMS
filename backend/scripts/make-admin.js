const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const userModel = require('../models/user');

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI not found in .env');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to mongo');

    const username = 'bardia';
    const user = await userModel.findOne({ username });
    if (!user) {
      console.error('user not found:', username);
      process.exit(1);
    }

    user.role = 'ADMIN';
    await user.save();
    console.log('user updated to ADMIN:', username);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
