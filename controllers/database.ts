import { time } from "console";
import { resolve } from "path";

class Database {
    conn :any
    constructor() {
        var mysql = require('mysql2');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'mysql',
            password: 'password',
            port: '/var/run/mysqld/mysqld.sock'
        })
    }

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


