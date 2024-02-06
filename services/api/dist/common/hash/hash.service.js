"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashService = void 0;
const common_1 = require("@nestjs/common");
const hash_enum_1 = require("../enums/hash.enum");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let HashService = class HashService {
    async hash(stringToHash, algo = hash_enum_1.HashingAlgorithm.bcrypt) {
        if (algo == hash_enum_1.HashingAlgorithm.bcrypt) {
            const salt = await bcrypt.genSalt();
            return await bcrypt.hash(stringToHash, salt);
        }
        else if (algo == hash_enum_1.HashingAlgorithm.sha256) {
            const salt = 'teste';
            return crypto
                .createHash(hash_enum_1.HashingAlgorithm.sha256)
                .update(`${salt}${stringToHash}`)
                .digest('hex');
        }
    }
    async compare(string, hash, algo = hash_enum_1.HashingAlgorithm.bcrypt) {
        if (algo == hash_enum_1.HashingAlgorithm.bcrypt) {
            return await bcrypt.compare(string, hash);
        }
        else if (algo == hash_enum_1.HashingAlgorithm.sha256) {
            const salt = 'teste';
            return (crypto
                .createHash(hash_enum_1.HashingAlgorithm.sha256)
                .update(`${salt}${string}`)
                .digest('hex') == hash);
        }
    }
};
HashService = __decorate([
    (0, common_1.Injectable)()
], HashService);
exports.HashService = HashService;
//# sourceMappingURL=hash.service.js.map