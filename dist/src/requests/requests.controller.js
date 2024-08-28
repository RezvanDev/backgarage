"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const common_1 = require("@nestjs/common");
const requests_service_1 = require("./requests.service");
let RequestController = class RequestController {
    constructor(requestsService) {
        this.requestsService = requestsService;
    }
    getAll(id) {
        const parsedId = parseInt(id, 10);
        return this.requestsService.getAll(parsedId);
    }
    getById(id) {
        const parsedId = parseInt(id, 10);
        return this.requestsService.getById(parsedId);
    }
    async createRequest(body, userId) {
        const parsedUserId = parseInt(userId, 10);
        const { carId, name, image } = body;
        const parsedCarId = parseInt(carId, 10);
        return this.requestsService.createRequest({ userId: parsedUserId, carId: parsedCarId, name, image });
    }
    getByNotifications(userId) {
        const parsedUserId = parseInt(userId, 10);
        return this.requestsService.getByCarNotifications(parsedUserId);
    }
    async respondRequest(id, userId) {
        const parsedId = parseInt(id, 10);
        const parsedUserId = parseInt(userId, 10);
        return this.requestsService.responded(parsedId, parsedUserId);
    }
};
exports.RequestController = RequestController;
__decorate([
    (0, common_1.Get)('all/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('/notifications'),
    __param(0, (0, common_1.Headers)('user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "getByNotifications", null);
__decorate([
    (0, common_1.Put)('/responded/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "respondRequest", null);
exports.RequestController = RequestController = __decorate([
    (0, common_1.Controller)('request'),
    __metadata("design:paramtypes", [requests_service_1.RequestService])
], RequestController);
//# sourceMappingURL=requests.controller.js.map