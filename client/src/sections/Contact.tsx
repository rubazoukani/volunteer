import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../components/form/Button';
import ContactImage from "../assets/global.jpg"

const Contact = (): React.ReactNode => {
  return (
    <section id='lan-contact' className="contact-section bg-main h-100vh flex-center">
      <Container className='mx-sm-auto mx-2'>
        <Row className="contact-box rounded shadow-lg overflow-hidden">
          <Col lg={6} className="contact-image p-0 d-none d-lg-block">
            <img
              src={ContactImage}
              alt="Contact us"
              className="img-fluid w-100 h-100 object-fit-cover"
            />
          </Col>
          <Col lg={6} className="bg-white p-5">
            <h2 className="mb-4 f-important text-main">Contact Us</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Your Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message:</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message" />
              </Form.Group>

              <Button variant="main" type="submit" className="py-1 px-3 rounded">
                Submit
              </Button>
            </Form>

            <div className="contact-details mt-4 small text-muted">
              <p className='mb-1'><FaPhoneAlt className="me-2 text-main" /> +1 234 567 890</p>
              <p className='mb-1'><FaEnvelope className="me-2 text-main" /> contact@example.com</p>
              <p className='mb-1'><FaMapMarkerAlt className="me-2 text-main" /> 123 Main Street, City</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
