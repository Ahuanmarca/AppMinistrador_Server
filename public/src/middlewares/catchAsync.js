"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function catchAsync(asyncFunc) {
    return (req, res, next) => {
        asyncFunc(req, res, next).catch(next);
    };
}
exports.default = catchAsync;
