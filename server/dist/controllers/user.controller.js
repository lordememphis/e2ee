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
const argon2_1 = __importDefault(require("argon2"));
const services_1 = require("../services");
class UserController {
    static getInstance() {
        if (!UserController.instance)
            UserController.instance = new UserController();
        return UserController.instance;
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield services_1.userService.list(100, 0);
            res.status(200).send(users);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            const userId = yield services_1.userService.create(req.body);
            res.status(201).send({ id: userId });
        });
    }
}
exports.default = UserController.getInstance();
//# sourceMappingURL=user.controller.js.map