"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const converterService_1 = require("../converterService");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.post('/html', (req, res) => {
    const converterService = new converterService_1.ConverterService(req.query.input, converterService_1.ConversionType.MARKDOWN);
    return res.send(converterService.run());
});
app.post('/markdown', (req, res) => {
    const converterService = new converterService_1.ConverterService(req.query.input, converterService_1.ConversionType.MARKDOWN);
    return res.send(converterService.run());
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
