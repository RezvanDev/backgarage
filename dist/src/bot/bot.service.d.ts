export declare class BotService {
    private readonly bot;
    constructor();
    sendMessage(chatId: bigint, message: string, webAppUrl: string): Promise<void>;
}
