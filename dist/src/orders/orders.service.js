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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bot_service_1 = require("../bot/bot.service");
let OrdersService = class OrdersService {
    constructor(prisma, botService) {
        this.prisma = prisma;
        this.botService = botService;
    }
    async getAll(id) {
        return this.prisma.order.findMany({
            where: {
                OR: [
                    { buyerId: id },
                    { sellerId: id }
                ]
            },
            include: {
                parts: {
                    include: {
                        car: true
                    }
                }
            }
        });
    }
    async getById(id) {
        return this.prisma.order.findUnique({
            where: {
                id
            },
            include: {
                parts: true
            }
        });
    }
    async updateStatus(id, status) {
        return this.prisma.order.update({
            where: {
                id
            },
            data: {
                status: status
            }
        });
    }
    async createOrder(buyerId, cartId, deliveryAddress, phoneNumber, screenshot) {
        const cart = await this.prisma.cart.findUnique({
            where: {
                id: cartId
            },
            include: {
                parts: true
            }
        });
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }
        if (!cart.parts || cart.parts.length === 0) {
            throw new Error(`Cart with id ${cartId} has no parts`);
        }
        const order = await this.prisma.order.create({
            data: {
                buyerId,
                sellerId: cart.parts[0].sellerId,
                price: cart.price * 1.05,
                parts: {
                    connect: cart.parts.map(part => ({ id: part.id }))
                },
                deliveryAddress,
                phoneNumber,
                paymentScreenshot: screenshot || null
            },
        });
        await this.prisma.cart.update({
            where: {
                id: cartId
            },
            data: {
                parts: {
                    set: []
                },
                price: 0,
                count: 0
            }
        });
        const managers = await this.prisma.user.findMany({
            where: {
                role: 'Manager'
            }
        });
        const message = `Новый заказ на ${cart.parts.length} деталей`;
        const promises = managers.map(async (manager) => {
            await this.botService.sendMessage(manager.telegramId, message, 'https://mygarage-webapp.vercel.app/manager/actual-orders');
        });
        await Promise.all(promises);
        return order;
    }
    async getPayedOrders() {
        return this.prisma.order.findMany({
            where: {
                status: 'PAYED'
            },
            include: {
                parts: true
            }
        });
    }
    async getPaymentConfirmed() {
        return this.prisma.order.findMany({
            where: {
                status: 'PAYMENT_CONFIRMED'
            },
            include: {
                parts: true
            }
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, bot_service_1.BotService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map