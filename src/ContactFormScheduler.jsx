import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function ContactFormScheduler() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    dateTime: '',
  });

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateTime: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here.
    // For now, we'll just display the entered data as confirmation.
    setConfirmation(JSON.stringify(formData, null, 2));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="address">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="dateTime">
          <Form.Label>Choose Date and Time</Form.Label>
          <Datetime
            onChange={handleDateChange}
            inputProps={{ name: 'dateTime' }}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      {confirmation && (
        <div className="mt-4">
          <h4>Confirmation Data</h4>
          <pre>{confirmation}</pre>
        </div>
      )}
    </Container>
  );
}

export default ContactFormScheduler;
