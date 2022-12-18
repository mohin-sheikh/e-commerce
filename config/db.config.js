const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

exports.database = () => {
    mongoose["connect"](process.env.MONGO_URL);
    mongoose.connection.on('open', () => {
        console.log('Database is Connected');
    });
};
