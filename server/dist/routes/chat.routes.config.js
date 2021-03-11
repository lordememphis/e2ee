"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const _1 = __importDefault(require("."));
const controllers_1 = require("../controllers");
class ChatRoutes extends _1.default {
    constructor(app) {
        super(app, 'ChatsRoutes');
    }
    configureRoutes() {
        this.app
            .route('/chats')
            .get(controllers_1.chatController.getChats)
            .post(controllers_1.chatController.createChat);
        this.app.route('/chats/:chatId/messages').get().post();
        return this.app;
    }
}
exports.ChatRoutes = ChatRoutes;
//# sourceMappingURL=chat.routes.config.js.map