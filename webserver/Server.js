const express = require('express');
const cors = require('cors');
const db = require('../db/db');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            user: '/api/user',
            auth: '/api/auth',
            bill: '/api/bill',
            holding: '/api/holding',
            income: '/api/income',
            wallet: '/api/wallet'
        }

        this.connectionDb();
        this.middlewares();
        this.router();
    }

    async connectionDb () {
        await db();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    router() {
        this.app.use(this.paths.user, require('../routers/user'));
        this.app.use(this.paths.auth, require('../routers/auth'));
        this.app.use(this.paths.bill, require('../routers/bill'));
        this.app.use(this.paths.holding, require('../routers/holding'));
        this.app.use(this.paths.income, require('../routers/income'));
        this.app.use(this.paths.wallet, require('../routers/wallet'));
    }

    listen() {
        this.app.listen(this.port);
    }


}



module.exports = Server