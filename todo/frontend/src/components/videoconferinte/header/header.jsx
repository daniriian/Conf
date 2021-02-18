import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './header.scss';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const showAddModifyForm = () => {
    props.onAddButtonClick();
  };
  const history = useHistory();

  const searchDataChange = (data) => {
    setSelectedDate(data);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    let sDate = selectedDate
      ? selectedDate.toLocaleDateString('ro-RO').substring(0, 10)
      : '';
    props.onSearchButtonClick(sDate);
    history.push('/videoconferinte');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/videoconferinte">Videoconferinţe</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Acasă</Nav.Link>
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
          <NavDropdown title="Instanţa" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              Tribunalul Cluj
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">
              Judecătoria Cluj-Napoca]
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Judecătoria Dej
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              Judecătoria Gherla
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.5">
              Judecătoria Huedin
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.6">
              Judecătoria Turda
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          {/* <FormControl type="date" placeholder="Data" className="mr-sm-2" /> */}
          <DatePicker
            selected={selectedDate}
            onChange={searchDataChange}
            dateFormat="dd.MM.yyyy"
            className="mx-2 form-control"
          />
          <Button
            variant="outline-success"
            className="mr-sm-2"
            onClick={handleSearchClick}
          >
            Caută
          </Button>
          <Button variant="success" onClick={showAddModifyForm}>
            Adaugă
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
