"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const services_1 = require("../services");
const log = debug_1.default('app:user-dao');
class UserDao {
    constructor() {
        this.Schema = services_1.dbService.db.Schema;
        this.userSchema = new this.Schema({
            username: String,
            email: { type: String, unique: true },
            password: String,
        }, { versionKey: false });
        this.User = services_1.dbService.db.model('User', this.userSchema);
        log('Created new instance of UsersDao');
    }
    static getInstance() {
        if (!UserDao.instance)
            UserDao.instance = new UserDao();
        return UserDao.instance;
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield new this.User({
                username: user.username,
                email: user.email,
                password: user.password,
            })
                .save()
                .then((doc) => doc);
            return doc._id;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email }).exec();
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.find().exec();
        });
    }
}
exports.default = UserDao.getInstance();
//# sourceMappingURL=user.dao.js.map