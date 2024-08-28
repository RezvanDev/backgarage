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
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
let BotService = class BotService {
    constructor() {
        this.bot = new telegraf_1.Telegraf('7066498966:AAGe0PJTKhty_1S-8gy7016myjsIfYztT0Q');
        this.bot.launch().then(() => {
            console.log('Bot started successfully');
        }).catch(err => {
            console.error('Bot launch error:', err);
        });
    }
    async sendMessage(chatId, message, webAppUrl) {
        await this.bot.telegram.sendMessage(chatId.toString(), message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Открыть в приложении', web_app: { url: webAppUrl } }],
                ],
            },
        });
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BotService);
//# sourceMappingURL=bot.service.js.map