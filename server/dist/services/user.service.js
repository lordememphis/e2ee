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
const daos_1 = require("../daos/");
class UserService {
    static getInstance() {
        if (!UserService.instance)
            UserService.instance = new UserService();
        return UserService.instance;
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield daos_1.userDao.getUsers();
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield daos_1.userDao.addUser(resource);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield daos_1.userDao.getUserByEmail(email);
        });
    }
}
exports.default = UserService.getInstance();
//# sourceMappingURL=user.service.js.map