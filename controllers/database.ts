// Represents a MySQL database which can be interacted with, but could be extended
// to represent any other type of database which has a JS driver
class Database {
    conn :any
    constructor() {
        var mysql = require('mysql2');
        // Hardcoded username and password for simplicity, could change to accept
        // user input or similar 
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'mysql',
            password: 'password',
            port: '/var/run/mysqld/mysqld.sock'
        })
    }

    // Creates the database and table needed if they do not already exist
    init() {
        console.log("Database connected")
        var sql :string = 'CREATE DATABASE IF NOT EXISTS donaciktbackend;'
        this.conn.query(sql, (err: Error, result: any) => {
           if (err) throw err;
        })  
        sql = 'USE donaciktbackend;'
        this.conn.query(sql, (err: Error, result: any) => {
            if (err) throw err;
        })  
        sql = 'CREATE TABLE IF NOT EXISTS members (id INT AUTO_INCREMENT PRIMARY KEY, firstName TEXT NOT NULL,lastName TEXT NOT NULL,phone TEXT NOT NULL, emailId TEXT NOT NULL, role INT NOT NULL) ENGINE=INNODB;'
        this.conn.query(sql, (err: Error, result: any) => {
            if (err) throw err;
        }) 
    }

    // Returns all entries in the members table 
    getAll() {
        return new Promise((resolve) => {
            var sql = 'USE donaciktbackend;'
            this.conn.query(sql, (err: Error, result: any) => {
                if (err) throw err;
            })  
            sql = 'SELECT * from members'
            this.conn.execute(sql, (err: Error, result: any) => {
                if (err) throw err;
                resolve(JSON.stringify(result))
            })
        })
    }

    // Gets a specific row from the members table identified by an ID number
    getRow(id :Number) {
        return new Promise((resolve) => {
            var sql = 'USE donaciktbackend;'
            this.conn.query(sql, (err: Error, result: any) => {
                if (err) throw err;
            })  
            sql = 'SELECT * from members WHERE id = ' + String(id)
            this.conn.execute(sql, (err: Error, result: any) => {
                if (err) throw err;
                resolve(JSON.stringify(result))
            })
        })
    }

    // Inserts a new row in the members table based on the given JSON object which
    // should contain all required fields
    insert(inputs :JSON) {
        return new Promise((resolve) => {
            var keys :string = ""
            var vals :string = ""
            for (var key in Object.keys(inputs)){
                keys += Object.keys(inputs)[key] + ", "
                vals += "\"" + String(Object.values(inputs)[key]) + "\", "
            }
            keys = (keys.substring(0, keys.length - 2))
            vals = (vals.substring(0, vals.length - 2))

            var sql = 'USE donaciktbackend;'
            this.conn.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            })
            var sql = 'INSERT INTO members (' + keys + ') VALUES (' + vals + ');'
            this.conn.query(sql, (err: Error, result: any) => {
                if (err) throw err;
                resolve(result)
            })
        })
    }

    // Edits a row based on given ID and input JSON. Will edit only the provided fields
    // and keep others unchanged
    edit(id :number, inputs :JSON) {
        return new Promise((resolve) => {
            var set :string = ""
            for (var key in Object.keys(inputs)){
                set += Object.keys(inputs)[key] + " = \""
                    + String(Object.values(inputs)[key]) + "\",\n"
            }
            set = (set.substring(0, set.length - 2))

            var sql = 'USE donaciktbackend;'
            this.conn.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            })
            var sql = 'UPDATE members SET ' + set + ' WHERE id = ' + String(id) + ';'
            this.conn.query(sql, (err: Error, result: any) => {
                if (err) throw err;
                resolve(result)
            })
        })
    }

    // Deletes a row with the given ID number
    delete(id :number) {
        var sql = 'USE donaciktbackend;'
        this.conn.query(sql, (err: Error, result: any) => {
           if (err) throw err;
        })
        var sql = 'DELETE FROM members WHERE id = ' + String(id) + ';'
        this.conn.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            return result
        })
    }
}

export { Database }


