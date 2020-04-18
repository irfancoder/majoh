import React from "react";
import ContactCard from "../components/CONTACT/ContactCard";
import { Helmet } from "react-helmet";
import favicon from "../assets/images/favicon.ico";
const Contact = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact | Majoh</title>
        <link rel="canonical" href="http://majoh.com.my/contact" />
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <div>
        <ContactCard></ContactCard>
      </div>
    </>
  );
};

export default Contact;
