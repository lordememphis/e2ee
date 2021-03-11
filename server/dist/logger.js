"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = __importStar(require("winston"));
const path = __importStar(require("path"));
const { format } = winston;
const { combine, label, timestamp, printf } = format;
const logFormat = printf((info) => {
    return JSON.stringify(Object.assign(Object.assign({}, info), { service: 'service-id' }));
});
const container = new winston.Container();
const logsPath = `logs`;
const filenamePrefix = `${path.join(__dirname, logsPath, 'service-id')}`;
container.add('main', {
    format: combine(label({ label: 'service-name' }), timestamp(), logFormat),
    transports: [
        new winston.transports.Console({ level: 'silly' }),
        new winston.transports.File({
            filename: `${filenamePrefix}-error.log`,
            level: 'error',
        }),
        new winston.transports.File({ filename: `${filenamePrefix}.log` }),
    ],
});
exports.logger = container.get('main');
exports.logger.exceptions.handle(new winston.transports.File({ filename: `${filenamePrefix}-exceptions.log` }));
//# sourceMappingURL=logger.js.map