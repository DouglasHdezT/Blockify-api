const Mongoose = require("mongoose");
const chalk = require("chalk");

/**
 * Variables from env
 */
const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "blockify";

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;

/**
 * Custom messages
 */
const connectionSuccesful =
	`Connection to ${chalk.bold.hex("#5C6BC0")(dbname)} database ${chalk.bold.hex("#66BB6A")("successful")}`;
const connectionFailure =
	`${chalk.bold.hex("#EF5350")("Error: ")}Cannot connext to ${chalk.bold.hex("#5C6BC0")(dbname)} database!`;
const disconnectMsg = 
    `Connection end: ${chalk.bold.hex("#5C6BC0")(dbname)} database`;

/**
 * Connection to Mongo database method
 */
const connect = async () => {
    try {
        await Mongoose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
		});
		console.log(connectionSuccesful);
    } catch (error) {
        console.log(connectionFailure);
        process.exit(1);
    }
};

/**
 * Disconnect method 
 */
const disconnect = async () => { 
    try {
        await Mongoose.disconnect();
        console.log(disconnectMsg);
    } catch (error) {
        process.exit(1);
    }
}

module.exports = {
    connect,
    disconnect
}