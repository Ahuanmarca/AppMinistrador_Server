"use strict";
/**
 * ExpressError
 * We can throw ExpressError to catch errors that won't be
 * automatically detected by node. They will pass to next
 * and reach app.use at the bottom (of index.ts).
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = ExpressError;
