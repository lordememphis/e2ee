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
const log = debug_1.default('app:chats-dao');
class ChatDao {
    constructor() {
        this.schema = new services_1.dbService.db.Schema({
            userRx: Object,
            userTx: Object,
        }, { versionKey: false });
        this.Chat = services_1.dbService.db.model('Chat', this.schema);
        log('Created an instance of ChatsDao');
    }
    static getInstance() {
        if (!ChatDao.instance)
            ChatDao.instance = new ChatDao();
        return ChatDao.instance;
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Chat.find().exec();
        });
    }
    createChat(users) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield new this.Chat({ userRx: users[0], userTx: users[1] })
                .save()
                .then((doc) => doc);
            return chat._id;
        });
    }
}
exports.default = ChatDao.getInstance();
//# sourceMappingURL=chat.dao.js.map