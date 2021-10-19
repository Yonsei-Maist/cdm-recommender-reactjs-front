import React from "react";
import { MDBNotification } from "mdbreact";

const EnabledWordAddModeNotification = () => {
  return (
    <MDBNotification
      autohide={5000}
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
  );
};

export default EnabledWordAddModeNotification;
