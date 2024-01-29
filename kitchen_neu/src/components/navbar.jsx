import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Tab2Content from './Küche';
import Tab1Content from './Theke';

function TabsComponent() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Cloud Kitchen</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="#tab1"
              active={activeTab === 'tab1'}
              onClick={() => handleTabClick('tab1')}
            >
              Theke
            </Nav.Link>
            <Nav.Link
              href="#tab2"
              active={activeTab === 'tab2'}
              onClick={() => handleTabClick('tab2')}
            >
              Küche
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {activeTab === 'tab1' && <Tab1Content />}
        {activeTab === 'tab2' && <Tab2Content />}
      </Container>
    </>
  );
}

export default TabsComponent;
