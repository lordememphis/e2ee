"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.dbService = exports.chatService = void 0;
const chat_service_1 = __importDefault(require("./chat.service"));
exports.chatService = chat_service_1.default;
const db_service_1 = __importDefault(require("./db.service"));
exports.dbService = db_service_1.default;
const user_service_1 = __importDefault(require("./user.service"));
exports.userService = user_service_1.default;
//# sourceMappingURL=index.js.map