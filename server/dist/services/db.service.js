"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('mongo');
class DatabaseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        this.connectWithRetry();
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new DatabaseService();
        return this.instance;
    }
    get db() {
        return mongoose_1.default;
    }
    connectWithRetry() {
        log('Connecting database with retry');
        mongoose_1.default
            .connect('mongodb://localhost:27017/e2ee_demo', this.mongooseOptions)
            .then(() => log('Database connected'))
            .catch((err) => {
            log(`Database connection failed. Retrying (#${++this.count}) in 5s`, err);
            setTimeout(this.connectWithRetry, 5000);
        });
    }
}
exports.default = DatabaseService.getInstance();
//# sourceMappingURL=db.service.js.map