"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = exports.ChatRoutes = void 0;
class RoutesConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.default = RoutesConfig;
var chat_routes_config_1 = require("./chat.routes.config");
Object.defineProperty(exports, "ChatRoutes", { enumerable: true, get: function () { return chat_routes_config_1.ChatRoutes; } });
var user_routes_config_1 = require("./user.routes.config");
Object.defineProperty(exports, "UserRoutes", { enumerable: true, get: function () { return user_routes_config_1.UserRoutes; } });
//# sourceMappingURL=index.js.map