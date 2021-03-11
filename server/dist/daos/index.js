"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDao = exports.chatDao = void 0;
const chat_dao_1 = __importDefault(require("./chat.dao"));
exports.chatDao = chat_dao_1.default;
const user_dao_1 = __importDefault(require("./user.dao"));
exports.userDao = user_dao_1.default;
//# sourceMappingURL=index.js.map