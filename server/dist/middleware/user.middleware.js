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
class UserMiddleware {
    static getInstance() {
        if (!UserMiddleware.instance)
            UserMiddleware.instance = new UserMiddleware();
        return UserMiddleware.instance;
    }
    validateRequiredFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.username && req.body.email && req.body.password)
                next();
            else
                res
                    .status(400)
                    .send({ error: 'Missing field username, email or password' });
        });
    }
    validateEmailExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield services_1.userService.getUserByEmail(req.body.email))
                res.status(400).send({
                    error: `A user with email '${req.body.email}' already exists`,
                });
            else
                next();
        });
    }
}
exports.default = UserMiddleware.getInstance();
//# sourceMappingURL=user.middleware.js.map