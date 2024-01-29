import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function Kitchen() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        fetch('http://localhost:8080/orders')
            .then((response) => response.json())
            .then((data) => {
                console.log('Abruf der Bestellungen:', data); // Überprüfen Sie, ob Daten korrekt abgerufen werden
                setOrders(data.reverse());
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Bestellungen:', error);
            });
    };

    const markOrderAsCompleted = (orderId) => {
        fetch(`http://localhost:8080/order/${orderId}/complete`, { method: 'PATCH' })
            .then((response) => {
                if (response.ok) {
                    // Aktualisieren Sie den State sofort, um die Bestellung zu entfernen
                    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
                } else {
                    console.error('Fehler beim Markieren der Bestellung als erledigt');
                }
            })
            .catch((error) => {
                console.error('Fehler beim Senden der Anfrage:', error);
            });
    };

    useEffect(() => {
        // Initial die Bestellungen abrufen
        fetchOrders();

        // Intervall einrichten, um die Bestellungen regelmäßig abzurufen
        const fetchOrdersInterval = setInterval(fetchOrders, 5000);

        // Aufräumen, wenn die Komponente unmontiert wird
        return () => clearInterval(fetchOrdersInterval);
    }, []);

    return (
        <div className="container-fluid">
            <h1>Küche</h1>
            {orders.map((order) => (
                <div key={order._id} className="my-3 border p-3 d-flex justify-content-between">
                    <div>
                        <h4>Bestellung:</h4>
                        <ul className="list-group list-group-horizontal">
                            {order.details.items.map((item, itemIndex) => (
                                <li className="list-group-item" key={itemIndex}>
                                    {item.anzahl}x {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button variant="primary" className="w-25" onClick={() => markOrderAsCompleted(order._id)}>Erledigt</Button>
                </div>
            ))}
        </div>
    );
    
}

export default Kitchen;
