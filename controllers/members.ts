import { ServerResponse, IncomingMessage } from "http";
import { ResultSetHeader } from "mysql2";
import { Database } from "./database";

const getMembers = async (req: IncomingMessage, res: ServerResponse, db :Database) => {
    try {
        var result = await db.getAll()
        console.log(result)
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
            console.log(result)
            console.log(message)
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
        console.log(result)
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