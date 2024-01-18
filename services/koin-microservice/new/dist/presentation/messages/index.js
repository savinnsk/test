"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorize_message_1 = require("./authorize/authorize.message");
const capture_message_1 = require("./capture/capture.message");
const parser_message_1 = require("./parser/parser.message");
const refund_message_1 = require("./refund/refund.message");
exports.default = [authorize_message_1.AuthorizeMessage, capture_message_1.CaptureMessage, parser_message_1.ParserMessage, refund_message_1.RefundMessage];
//# sourceMappingURL=index.js.map