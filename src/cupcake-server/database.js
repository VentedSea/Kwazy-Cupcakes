// node-postgres connection to database
const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'cupcakedb',
    user: 'richard',
    password: 'Kwazy',
  })

class Database {
    constructor() {
        client.connect();   // Connect to the database
    }

    async Query(text, values) {
        try {   // Try to query the database
            //console.log('before query');
            const res = await client.query(text, values)
            //console.log('after query',res);
            
            return this.#CheckQueryResult(res);
        } catch (err) { // Catch any errors and return them to the caller
            return this.#GenerateErrJSON(err);
        }
    }

    // Turn the error into a JSON object response
    #GenerateErrJSON(err) {
        //console.log(err);
        return {
            status: 500,
            body: {"Database error": err.detail},
        };
    }

    #CheckQueryResult(res) {
        if (res.rowCount == 0) {    // If no rows were returned
            //console.log(res);
            return {
                status: 404,
                body: {"No results": "No results were found"},
            };
        } else if (res.rows.length == 0 && res.command == "INSERT") { // If no rows were returned and the command was an INSERT
            return {
                status: 200,
                body: {"Success": "Insertion successful"},
            };
        } else if (res.rows.length == 0 && res.command == "UPDATE") { // If no rows were returned and the command was an UPDATE
            return {
                status: 200,
                body: {"Success": "Update successful"},
            };
        } else if (res.rows.length == 0 && res.command == "DELETE") { // If no rows were returned and the command was an DELETE
            return {
                status: 200,
                body: {"Success": "Delete successful"},
            };
        } else {
            //console.log(res);
            return {
                status: 200,
                body: res.rows,
            };
        }
    }

    async endClient() {
        await client.end();
    }
}

// Create and export the database object
const database = new Database();
module.exports = database;