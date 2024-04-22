import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const token = process.env.BOT_TOKEN as string;
const prisma = new PrismaClient();
const bot = new TelegramBot(token, { polling: true });
const dataAtual: Date = new Date();
const horaFuncionamento: boolean =
  dataAtual.getHours() >= 9 && dataAtual.getHours() < 18;
let isWaitingForEmail: boolean = false;

// Primeira Parte
bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;

  if (horaFuncionamento) {
    const botMessage: string =
      "Acesse o site da FAESA para dar prosseguimento: https://www.faesa.br/";
    return bot.sendMessage(chatId, botMessage);
  }

  const botMessageErro: string =
    "Olá, não estamos funcionando no momento. Envie seu email pois iremos retornar em breve.";
  bot.sendMessage(chatId, botMessageErro);

  isWaitingForEmail = true;
  console.log("Waiting for email...");
});

// Segunda Parte
bot.on("message", async (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  if (isWaitingForEmail) {
    console.log(`Received email: ${text}`);
    await saveEmail(chatId, text);
    bot.sendMessage(chatId, "Email saved successfully");
    isWaitingForEmail = false;
  }
});

// Terceira Parte
async function saveEmail(chatId: number, email: string) {
  try {
    await prisma.user.create({
      data: {
        id: chatId,
        email: email,
      },
    });
    console.log("Email saved successfully");
  } catch (error) {
    console.log("Error saving email:", error);
  }
}

console.log("BOT_TOKEN:", process.env.BOT_TOKEN);
