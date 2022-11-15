import http from "http";
import { Database } from "../controllers/database";
import { getMembers, addMember, deleteMember, editMember } from "../controllers/members"

const db = new Database()
db.init()
const server = http.createServer((req, res) => {
    if (req.method == 'GET' && req.url == '/users') {
        return getMembers(req, res, db)
    }
    else if (req.method == 'POST' && req.url == '/users') {
        return addMember(req, res, db)
    }
    else if (req.method == 'POST' && req.url && req.url.includes('/users/')) {
        var parts = req.url.split('/')
        return editMember(req, res, Number(parts[2]), db)
    }
    else if (req.method == 'GET' && req.url && req.url.includes('/users/')) {
        var parts = req.url.split('/')
        return deleteMember(req, res, Number(parts[2]), db)
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
 });