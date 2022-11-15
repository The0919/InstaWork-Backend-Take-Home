import { ServerResponse, IncomingMessage } from "http";
import { ResultSetHeader } from "mysql2";
import { Database } from "./database";

// Asynchronously reads the data from the given database and returns a response with a code of 200
// if the process succeeds, or 500 and the error code if the response fails
const getMembers = async (req: IncomingMessage, res: ServerResponse, db :Database) => {
    try {
        var result = await db.getAll()
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                error: err,
            })
        ); 
    } finally {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: true,
                message: result,
            })
        ); 
    }
    return result
}

const addMember = async (req: IncomingMessage, res: ServerResponse, db :Database) => {
    var body = ''
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () =>{
        try {
            var result = await db.insert(JSON.parse(body))
            console.log(result)
        } 
        catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                error: err,
            })
        ); 
        } finally {
            var b = JSON.parse(body)
            b['id'] = (<ResultSetHeader>result)['insertId']
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: true,
                    message: b,
                })
            ); 
        }
        return result
    })
}

const editMember = async (req: IncomingMessage, res: ServerResponse, id: number, db :Database) => {
    var body = ''
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () =>{
        try {
            var result = await db.edit(id, JSON.parse(body))
            var message = await db.getRow(id)
        } 
        catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                error: err,
            })
        ); 
        } finally {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: true,
                    message: message,
                })
            ); 
        }
        return result
    })
}

const deleteMember = async (req: IncomingMessage, res: ServerResponse, id: number, db :Database) => {
    try {
        var result = await db.delete(id)
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                error: err,
            })
        ); 
    } finally {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: true,
                message: "",
            })
        ); 
    }
    return result
}

export { getMembers, addMember, deleteMember, editMember } 