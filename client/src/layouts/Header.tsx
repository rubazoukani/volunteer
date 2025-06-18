import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { cn } from "../misc/helpers";
import { VscThreeBars } from "react-icons/vsc";
import Logo from "../assets/logo.svg"

const Header = (): React.JSX.Element => {
  const [isBarActive, setIsBarActive] = useState<boolean>(false);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      id="header"
      className="content bg-white w-100 py-2 px-md-5 px-2 flex-center-y justify-content-between gap-3 shadow-sm"
    >
      <Navbar.Brand href="#" as={"h5"} className="m-0 flex-center-y gap-2 fs-3">
        <img
          src={Logo}
          alt="logo"
          width={25}
          height={25}

        />

        <p className="m-0 fs-6 text-black">Volunteer</p>
      </Navbar.Brand>

      <ul
        className={cn(
          isBarActive,
          "active",
          null,
          "sections-list ms-auto p-0 text-lg-start text-center transition-03 overflow-hidden"
        )}
      >
        <li
          className="position-relative"
        >
          <a href="#lan-hero" onClick={() => setIsBarActive(false)}>
            <p className="mb-0 py-md-0 py-2 fs-6 position-relative transition-03">Home</p>
          </a>
        </li>
        <li
          className="position-relative"
        >
          <a href="#lan-about" onClick={() => setIsBarActive(false)}>
            <p className="mb-0 py-md-0 py-2 fs-6 position-relative transition-03">About us</p>
          </a>
        </li>
        <li
          className="position-relative"
        >
          <a href="#lan-chances" onClick={() => setIsBarActive(false)}>
            <p className="mb-0 py-md-0 py-2 fs-6 position-relative transition-03">Chances</p>
          </a>
        </li>
        <li
          className="position-relative"
        >
          <a href="#lan-contact" onClick={() => setIsBarActive(false)}>
            <p className="mb-0 py-md-0 py-2 fs-6 position-relative transition-03">Contact us</p>
          </a>
        </li>
      </ul>

      <div className="flex-center gap-3">
        <VscThreeBars
          onClick={() => setIsBarActive((prev) => !prev)}
          fontSize={25}
          className={cn(
            isBarActive,
            "active",
            null,
            "icon mx-auto d-md-none d-block pointer transition-03"
          )}
        />

      </div>
    </Navbar>
  );
};

export default Header;
