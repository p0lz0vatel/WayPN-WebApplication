import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import YooKassa from 'yookassa';


const yooKassa = new YooKassa({
    shopId: '428721',
    secretKey: 'live_zyhWto-N9GpwFtYXEpeuiOmYJuD98dyBFsWtDzVRKB4'
});

var app = express();
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req,res) => { 
    res.sendFile(path.join(__dirname, "index.html")); 
})

app.get('/payment', async (req, res) => {
    // /payment?amount=69&chatid=125151262
    const customData = {
        amount: req.query.amount,
        chatId: req.query.chatid
      };

    const payment = await yooKassa.createPayment({
        amount: {
            value: customData["amount"],
            currency: "RUB"
        },
        capture: true,
        confirmation: {
            type: "redirect",
            return_url: "https://t.me/waypnbot"
        },
        metadata: {
            chat_id: customData["chatId"]
        },
        description: "Покупка WPN coins"
    });

    res.redirect(payment.confirmation.confirmation_url);
});


app.listen(3000); 