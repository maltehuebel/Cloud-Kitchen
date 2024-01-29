const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Verbindung zu Ihrer MongoDB-Datenbank
const mongoDBUrl = 'mongodb+srv://malte:malte1234@cluster0.ldrupui.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDBUrl)
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB Verbindungsfehler:', err));

// Schema und Modell für Bestellungen
const OrderSchema = new mongoose.Schema({
  status: String,
  details: mongoose.Schema.Types.Mixed
});

const Order = mongoose.model('Order', OrderSchema);

app.post('/order', async (req, res) => {
  const newOrder = new Order({
    status: 'offen',
    details: req.body
  });

  try {
    const savedOrder = await newOrder.save();
    console.log('Bestellung erhalten:', savedOrder);
    res.send({ message: 'Bestellung erhalten', orderId: savedOrder._id });
  } catch (error) {
    res.status(500).send('Fehler beim Speichern der Bestellung');
  }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'offen' });
        res.json(orders);
    } catch (error) {
        res.status(500).send('Fehler beim Abrufen der Bestellungen');
    }
});

app.patch('/order/:id/complete', async (req, res) => {
    const orderId = req.params.id;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'erledigt' }, { new: true });
        if (updatedOrder) {
            console.log('Bestellung als erledigt markiert:', updatedOrder);
            res.send({ message: 'Bestellung als erledigt markiert', orderId: updatedOrder._id });
        } else {
            res.status(404).send({ message: 'Bestellung nicht gefunden' });
        }
    } catch (error) {
        res.status(500).send('Fehler beim Aktualisieren der Bestellung:', error);
    }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
