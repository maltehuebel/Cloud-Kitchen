import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Product from './product';

function Theke() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchOpenOrders();
  }, []);

  const addToCart = (title, preis) => {
    const productIndex = cart.findIndex(item => item.title === title);

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex].anzahl += 1;
      setTotalPrice(totalPrice + preis);
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { title, preis, anzahl: 1 }];
      setTotalPrice(totalPrice + preis);
      setCart(updatedCart);
    }
  };

  const sendOrder = () => {
    fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
        totalPrice: totalPrice,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Bestellung erfolgreich gesendet:', data);
        setCart([]);
        setTotalPrice(0);
        fetchOpenOrders();
      })
      .catch(error => {
        console.error('Fehler beim Senden der Bestellung:', error);
      });
  };

  const fetchOpenOrders = () => {
    fetch('http://localhost:8080/orders')
      .then(response => response.json())
      .then(data => {
        console.log('Offene Bestellungen aus der Datenbank:', data); 
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der offenen Bestellungen:', error);
      });
  };

  return (
    <div>
      <h2>Theke</h2>
      <Row>
        <Col>
          <Product
            title="Pommes"
            img="/images/pommes.jpg"
            preis={2.50}
            onAdd={() => addToCart("Pommes", 2.50)}
          />
        </Col>
        <Col>
          <Product
            title="Schnitzel"
            img="/images/schnitzel.jpg"
            preis={3.00}
            onAdd={() => addToCart("Schnitzel", 3.00)}
          />
        </Col>
        <Col>
          <Product
            title="Wecken"
            img="/images/wecken.jpg"
            preis={1.50}
            onAdd={() => addToCart("Wecken", 1.50)}
          />
        </Col>
        <Col>
          <Product
            title="Wurst"
            img="/images/wurst.jpg"
            preis={2.50}
            onAdd={() => addToCart("Wurst", 2.50)}
          />
        </Col>
      </Row>

      <div className="my-4">
        <div className="border p-3">
          <h3>Warenkorb</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.anzahl}x {item.title} - {item.preis.toFixed(2)} €
              </li>
            ))}
          </ul>
          <h4>Gesamtpreis: {totalPrice.toFixed(2)} €</h4>
        </div>
      </div>

      <Button variant="primary" onClick={sendOrder}>
        Bestellung abschicken
      </Button>
    </div>
  );
}

export default Theke;
