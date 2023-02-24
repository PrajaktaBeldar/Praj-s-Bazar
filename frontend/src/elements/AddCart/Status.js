import React, { Fragment } from "react";
import { Stepper, StepLabel, Step } from "@mui/material";
import LocalShipping from "@mui/icons-material/LocalShipping";
import LibraryAddCheck from "@mui/icons-material/LibraryAddCheck";
import AccountBalance from "@mui/icons-material/AccountBalance";
import "./Status.css"; 
 
const Status = ({ activeStep }) => {
  const steps = [
    {
      label: <p>Shipping Details</p>,
      icon: <LocalShipping />,
    },
    {
      label: <p>Confirm Order</p>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <p>Payment</p>,
      icon: <AccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    backgroundColor: "rgb(231, 231, 231)"
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "blue" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default Status;
