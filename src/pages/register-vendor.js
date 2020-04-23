import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import favicon from "../assets/images/favicon.ico";

const VendorRegistration = () => {
  useEffect(() => {
    window.registerVendor();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vendor Registration | Majoh</title>
        <link rel="canonical" href="http://majoh.com.my/register-vendor" />
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          title="register-vendor"
          src="https://docs.google.com/forms/d/e/1FAIpQLSeO4v4noT2u7GbPzQBVvEcvT987EXFt9ZPkCkWtcH_KB4kaYw/viewform?embedded=true"
          width="640"
          height="1682"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
};

export default VendorRegistration;
