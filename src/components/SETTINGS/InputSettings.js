import React, { useState, useEffect } from "react";
import UserSettings from "./UserSettings";

import { isUserLoggedIn } from "../../utils";
import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";

const InputSettings = ({ handleInput, initInput }) => {
  const UserInfo = () => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    return (
      <UserSettings
        userData={userData}
        handleInput={handleInput}
        initInput={initInput}
      />
    );
  };

  return (
    <SuspenseWithPerf
      fallback={<p>loading user info...</p>}
      traceId={"load-burrito-status"}
    >
      <UserInfo />
    </SuspenseWithPerf>
  );
};
export default InputSettings;
