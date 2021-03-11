"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const _1 = __importDefault(require("."));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
class UserRoutes extends _1.default {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route('/users')
            .get(controllers_1.userController.listUsers)
            .post(middleware_1.userMiddleware.validateRequiredFields, middleware_1.userMiddleware.validateEmailExists, controllers_1.userController.createUser);
        this.app.route('/users/:userId').get().post();
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.config.js.map