import React, { useState, useEffect } from "react";
import { MDBNotification } from "mdbreact";

const EnabledWordAddModeNotification = () => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isShow && (
        <MDBNotification
          show
          fade
          icon="bell"
          iconClassName="text-primary"
          title="Word Add Mode Enabled"
          message="You can now select EMR words to add."
          text=""
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default EnabledWordAddModeNotification;
