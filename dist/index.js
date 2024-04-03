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
require("./src/config/environment");
const express_1 = __importDefault(require("express"));
const buildings_router_1 = __importDefault(require("./src/routes/buildings.router"));
const people_routes_1 = __importDefault(require("./src/routes/people.routes"));
const providers_router_1 = __importDefault(require("./src/routes/providers.router"));
const banking_router_1 = __importDefault(require("./src/routes/banking.router"));
const ExpressError_1 = __importDefault(require("./src/utils/ExpressError"));
const { PORT } = process.env;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.get('/', (req, res) => {
            res.send(`
    This is the AppMinistrador Server --
    API Docs available here: https://github.com/Ahuanmarca/AppMinistrador_Server
    `);
        });
        app.use('/buildings', buildings_router_1.default);
        app.use('/people', people_routes_1.default);
        app.use('/providers', providers_router_1.default);
        app.use('/banking', banking_router_1.default);
        app.all('*', (req, res, next) => {
            next(new ExpressError_1.default('Page Not Found', "404"));
        });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}
main();
