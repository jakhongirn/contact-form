const express = require("express");
const mailgun = require("mailgun-js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { Telegraf }= require("telegraf")

const app = express();
const PORT = process.env.PORT || 5000
const path = require("path");


dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)

const API_KEY = process.env.API_KEY 
const DOMAIN = process.env.DOMAIN 
//Data parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "success.html"))
})

app.post("/email", (req, res) => {
  const clientName = req.body.fullName;
  const clientNumber = req.body.phoneNumber

  console.log(clientName, clientNumber)

  bot.telegram.sendMessage(process.env.DEVELOPER_ID, `Приветики👋 Клиент хочет с вами связаться \n<b>Имя клиента:</b> ${clientName}\n<b>Номер клиента:</b> +${clientNumber} 📲`, { parse_mode: "HTML" })
  bot.telegram.sendMessage(process.env.GROUP_ID, `Приветики👋 Клиент хочет с вами связаться \n<b>Имя клиента:</b> ${clientName}\n<b>Номер клиента:</b> +${clientNumber} 📲`, { parse_mode: "HTML" })
  
  const mg = mailgun({
    apiKey: API_KEY,
    domain: DOMAIN
  });
  // const data = {
  //   from: "Modern Academy <admin@modernacademy.uz>",
  //   to: "jaykhansme@gmail.com",
  //   subject: "Заявка через инстаграм modernacademy.uz",
  //   text: `ФИО клиента: ${clientName}\nТелефон номер клиента: ${clientNumber}`
  // };
  // mg.messages().send(data, function (error, body) {
  //   console.log(body);
  // });
  res.redirect("/success")
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
