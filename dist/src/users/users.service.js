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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(telegramId, nickname, username) {
        const foundUser = await this.prisma.user.findFirst({
            where: { telegramId: BigInt(telegramId) }
        });
        if (foundUser) {
            return 'Пользователь уже зарегистрирован с айди ' + foundUser.telegramId.toString();
        }
        else {
            const user = await this.prisma.user.create({
                data: {
                    telegramId: BigInt(telegramId),
                    nickname,
                    username: username || null,
                }
            });
            return { username: user.username, nickname: user.nickname, telegramId: user.telegramId.toString() };
        }
    }
    async login(telegramId) {
        const user = await this.prisma.user.findFirst({
            where: { telegramId: BigInt(telegramId) }
        });
        if (!user) {
            return 'Пользователь не найден';
        }
        return 'Вы успешно вошли';
    }
    async setRole(userId, role) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId }
        });
        if (!user) {
            return 'Пользователь не найден';
        }
        if (!Object.values(client_1.Roles).includes(role)) {
            return 'Некорректная роль';
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: { role: role }
        });
        return 'Роль успешно обновлена';
    }
    async setNotifications(userId, brandsString) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return 'Пользователь не найден';
        }
        const brandsArray = brandsString.split(',').map(brand => brand.trim());
        const notifications = brandsArray.map(brand => {
            return client_1.Brands[brand] || null;
        }).filter(Boolean);
        if (notifications.length === 0) {
            return 'Некорректные бренды';
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { notifications: { set: notifications } },
        });
        return 'Уведомления успешно обновлены';
    }
    async adminGetAll() {
        const users = await this.prisma.user.findMany();
        return users.map(user => ({
            ...user,
            telegramId: user.telegramId.toString()
        }));
    }
    async adminGetById(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return 'Пользователь не найден';
        }
        return {
            ...user,
            telegramId: user.telegramId.toString()
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map