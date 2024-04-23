"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const token = process.env.BOT_TOKEN;
const prisma = new client_1.PrismaClient();
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const dataAtual = new Date();
const horaFuncionamento = dataAtual.getHours() >= 9 && dataAtual.getHours() < 18;
let isWaitingForEmail = false;
// Primeira Parte
bot.onText(/\/start/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    if (!horaFuncionamento) {
        const botMessage = "Acesse o site da FAESA para dar prosseguimento: https://www.faesa.br/";
        return bot.sendMessage(chatId, botMessage);
    }
    const botMessageErro = "Olá, não estamos funcionando no momento. Envie seu email pois iremos retornar em breve.";
    bot.sendMessage(chatId, botMessageErro);
    isWaitingForEmail = true;
    console.log("Waiting for email...");
}));
// Segunda Parte
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const text = msg.text || "";
    if (isWaitingForEmail) {
        console.log(`Received email: ${text}`);
        yield saveEmail(chatId, text);
        bot.sendMessage(chatId, "Email saved successfully");
        isWaitingForEmail = false;
    }
}));
// Terceira Parte
function saveEmail(chatId, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.user.create({
                data: {
                    chatId: chatId.toString(),
                    email: email,
                },
            });
            console.log("Email saved successfully");
        }
        catch (error) {
            console.log("Error saving email:", error);
        }
    });
}
console.log("BOT_TOKEN:", process.env.BOT_TOKEN);
