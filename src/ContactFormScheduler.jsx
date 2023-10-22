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
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
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

  const [confirmation, setConfirmation] = useState(null);

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

    // Format the entire formData object for display
    const formattedFormData = {
      ...formData,
      dateTime: formData.dateTime ? formData.dateTime.toLocaleString() : null,
    };

    setConfirmation(formattedFormData);
  };

  const renderConfirmationList = (data) => {
    return (
      <ul className="list-group">
        {Object.entries(data).map(([key, value]) => (
          <li className="list-group-item" key={key}>
            <strong>{key}:</strong> {key === 'dateTime' ? value.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : value}
          </li>
        ))}
      </ul>
    );
  };

  const statesList = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
    'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleReset = () => {
    // Reload the page to reset the form
    window.location.reload();
  };

  return (
    <Container>
      <header className="app-header" style={{ padding: '30px', marginBottom: '30px' }}>
        <h1 className="cool-header">Basic Calendar Picker</h1>
      </header>
      <Form onSubmit={handleSubmit}>

        <Row>
          <Col xs={12} md={6}>
          <Form.Group controlId="dateTime" className="form-group" style={{width: '120%', alignContent: 'center'}}>
          <Form.Label className='calenderarea'>Choose Date and Time</Form.Label><br />
          <DatePicker
            selected={formData.dateTime}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="h:mm aa" // Change the time format here
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            minTime={new Date().setHours(8, 0, 0, 0)}
            maxTime={new Date().setHours(20, 0, 0, 0)}
            className="form-control" // Bootstrap class
            required // Required field
          />
        </Form.Group>
            <Form.Group controlId="firstName" className='formMorgan'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>
            <Form.Group controlId="lastName" className='formMorgan'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>
            <Form.Group controlId="phone" className='formMorgan'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>
            <Form.Group controlId="email" className='formMorgan'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>

          </Col>
          <Col xs={12} md={6}>
          <Form.Group controlId="street1" className='formMorgan'>
              <Form.Label>Street 1</Form.Label>
              <Form.Control
                type="text"
                name="street1"
                value={formData.street1}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>
            <Form.Group controlId="street2" className='formMorgan'>
              <Form.Label>Street 2</Form.Label>
              <Form.Control
                type="text"
                name="street2"
                value={formData.street2}
                onChange={handleChange}
                className="form-control" // Bootstrap class
              />
            </Form.Group>
            <Form.Group controlId="city" className='formMorgan'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>
            <Form.Group controlId="state" className='formMorgan'>
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              >
                <option value="">Select State</option>
                {statesList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="zip" className='formMorgan'>
              <Form.Label>ZIP</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="form-control" // Bootstrap class
                required // Required field
              />
            </Form.Group>
          </Col>
        </Row>
<br/>
        <div style={{ textAlign: 'center' }}>
          <Button type="submit" variant="primary" className="btn btn-primary">
            Submit
          </Button>
          <Button
            style={{ marginLeft:'20px'}}
            type="button"
            variant="info"
            className="btn btn-info"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>
      {confirmation && (
        <div className="mt-4" style={{ paddingBottom: '30px', textAlign: 'left' }}>
          <h4 style={{textAlign: 'center'}}>Confirmation Data</h4>
          {renderConfirmationList(confirmation)}
        </div>
      )}
    </Container>
  );
}

export default ContactFormScheduler;
