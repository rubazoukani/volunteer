import React from "react";
import { Col, Container } from "react-bootstrap";
import { useAppContext } from "../context/AppProvider";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg"

const Hero = (): React.JSX.Element => {
  const { user } = useAppContext()
  const navigator = useNavigate()

  return (
    <section
      id="lan-hero"
      className="hero-wrapper p-0 flex-center position-relative overflow-hidden"
    >

      <Container className="hero-box mx-1 py-5 row rounded-3">
        <Col xs={12} md={6} className="text-md-start text-center text-dark">
          <h1 className="display-4 fw-bold">Volunteer</h1>
          <p className="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequatur quod odio asperiores, nesciunt a error quasi assumenda exercitationem soluta nobis laboriosam quis sapiente dolores accusamus neque ea rem cum!4
          </p>

          {
            user.role === "guest" ?
              <Button
                variant="main"
                className="px-5 py-1 border-0 rounded-3"
                onClick={() => navigator("/login")}
              >
                Login
              </Button>
              :
              <Button
                variant="main-outline"
                className="px-5 py-1 rounded-3"
                onClick={() => navigator("/profile")}
              >
                Profile
              </Button>
          }
        </Col>

        <Col xs={12} md={6} className="logo d-md-flex d-none flex-center">
          <img
            src={Logo}
            alt="logo"
            width={220}
            height={220}
          />
        </Col>
      </Container>
    </section>
  );
};

export default Hero;
