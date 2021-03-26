const mongoose = require('mongoose');
const uri = process.env.MONGODB_URL;
const options  = {
    // automatically try to reconnect when it loses connection
    autoReconnect: true,
    // reconnect every reconnectInterval milliseconds
    // for reconnectTries times
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // flag to allow users to fall back to the old
    // parser if they find a bug in the new parse
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

function MongoConnection(uri, options) {
    const _connect = function (uri, options) {
        const connection = mongoose.createConnection(uri, options);
        connection.on('connected', () => console.log(`Connected to ${uri}`));
        connection.on('connecting', () => console.log(`Trying to connect to ${uri}`));
        connection.on('disconnected', () => console.error(`Disconnected from ${uri}`));
        connection.on('disconnecting', () => console.error(`Disconnecting from ${uri}`));

        return connection;
    }
    if (!this._instance) {
        this._instance = _connect(uri, options);
    }
    return this._instance;
}

module.exports = new MongoConnection(uri, options);