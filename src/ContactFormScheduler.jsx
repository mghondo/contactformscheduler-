import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './contact.css';

function ContactFormScheduler() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    dateTime: null,
  });

  const validDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return current.isAfter(today);
  };

  const validTime = (date) => {
    const minTime = new Date(date);
    minTime.setHours(8, 0, 0, 0); // 8:00 AM

    const maxTime = new Date(date);
    maxTime.setHours(20, 0, 0, 0); // 8:00 PM

    const currentTime = new Date(date);

    if (currentTime >= minTime && currentTime <= maxTime) {
      const minutes = currentTime.getMinutes();
      return minutes === 0 || minutes === 30;
    }
    return false;
  };

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    if (validTime(date)) {
      setFormData({ ...formData, dateTime: date });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here.
    // For now, we'll just display the entered data as confirmation.
    setConfirmation(JSON.stringify(formData, null, 2));
  };

  return (
    <Container>

<header className="app-header" style={{padding: '30px', marginBottom: '30px'}}>
        <h1 className="cool-header">Basic Calendar Picker</h1>
      </header>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="firstName" className="form-group">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control" // Bootstrap class
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="lastName" className="form-group">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control" // Bootstrap class
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="phone" className="form-group">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control" // Bootstrap class
          />
        </Form.Group>
        <Form.Group controlId="email" className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control" // Bootstrap class
          />
        </Form.Group>
        <Form.Group controlId="address" className="form-group">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control" // Bootstrap class
          />
        </Form.Group>
        <Form.Group controlId="dateTime" className="form-group">
          <Form.Label>Choose Date and Time</Form.Label><br/>
          <DatePicker
            selected={formData.dateTime}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            minTime={new Date().setHours(8, 0, 0, 0)}
            maxTime={new Date().setHours(20, 0, 0, 0)}
            className="form-control" // Bootstrap class
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn btn-primary">
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
