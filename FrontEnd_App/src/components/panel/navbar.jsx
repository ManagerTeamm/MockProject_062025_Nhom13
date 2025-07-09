import React from "react";
import { Accordion } from "react-bootstrap";

const NavBar = ({ onShowSupportForm }) => (
  <div className="panel-left">
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Initial Response</Accordion.Header>
        <Accordion.Body>
          <p>Time of dispatching forces</p>
          <p>Time of arrival</p>
          <p>Officers assigned</p>
          <p>Preliminary assessment</p>
          <p>Scene preservation measures</p>
          <p
            className="text-primary"
            onClick={onShowSupportForm}
            style={{ cursor: "pointer" }}
          >
            Information on medical/rescue support provided
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Scene Information</Accordion.Header>
        <Accordion.Body>Scene details...</Accordion.Body> {/*them contain vo day*/}
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Field Report Summary</Accordion.Header>
        <Accordion.Body>Summary content...</Accordion.Body> {/*them contain vo day*/}
      </Accordion.Item>
    </Accordion>
  </div>
);

export default NavBar;
