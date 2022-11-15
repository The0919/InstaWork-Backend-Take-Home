import http from "http";
import { Database } from "../controllers/database";
import { getMembers, addMember, deleteMember, editMember } from "../controllers/members"

// Creates and initializes the server
const db = new Database()
db.init()

const server = http.createServer((req, res) => {
    // For each of these request types and addresses, perform a different action
    if (req.method == 'GET' && req.url == '/users') {
        return getMembers(req, res, db)
    }
    else if (req.method == 'POST' && req.url == '/users') {
        return addMember(req, res, db)
    }

    // If the POST or GET is directed at a specific user, pass that user as an argument
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