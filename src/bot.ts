import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();
const token = process.env.BOT_TOKEN as string;

const bot = new TelegramBot(token, { polling: true });

const dataAtual: Date = new Date();
const horaFuncionamento: boolean =
  dataAtual.getHours() >= 9 && dataAtual.getHours() < 18;

bot.onText(/\/start/, (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;

  if (!horaFuncionamento) {
    const botMessage: string =
      "Acesse o site da FAESA para dar prosseguimento: https://www.faesa.br/";
    return bot.sendMessage(chatId, botMessage);
  }

  const botMessageErro: string =
    "Olá, não estamos funcionando no momento. Envie seu email pois iremos retornar em breve.";
  bot.sendMessage(chatId, botMessageErro);
});

console.log("BOT_TOKEN:", process.env.BOT_TOKEN);
