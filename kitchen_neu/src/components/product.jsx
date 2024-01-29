import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Product(props) {
  const { title, img, preis } = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Preis: {preis.toFixed(2)} €
        </Card.Text>
        <Button onClick={props.onAdd} variant="primary">Hinzufügen</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
