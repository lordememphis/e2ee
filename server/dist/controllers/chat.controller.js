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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class ChatController {
    static getInstance() {
        if (!ChatController.instance)
            ChatController.instance = new ChatController();
        return ChatController.instance;
    }
    getChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield services_1.chatService.list(100, 0);
            res.status(200).send(chats);
        });
    }
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield services_1.chatService.create(req.body.users);
            res.status(200).send({ id: id });
        });
    }
}
exports.default = ChatController.getInstance();
//# sourceMappingURL=chat.controller.js.map