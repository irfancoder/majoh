import React from "react";
import ContactCard from "../components/CONTACT/ContactCard";
import { Helmet } from "react-helmet";
const Contact = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact | Majoh</title>
        <link rel="canonical" href="http://majoh.com.my/account" />
      </Helmet>
      <div>
        <ContactCard></ContactCard>
      </div>
    </>
  );
};

export default Contact;
