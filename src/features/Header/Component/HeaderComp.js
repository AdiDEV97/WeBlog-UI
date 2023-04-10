// import { Grid } from '@mui/material';
// import React, { useState } from 'react';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText,
// } from 'reactstrap';

// function HeaderComp() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//         <Navbar color='dark' dark expand='md'>
//             <NavbarBrand to='#'>ReactStrap</NavbarBrand>
//             <NavbarToggler onClick={toggle} />
//             <Collapse isOpen={isOpen} >
//                 <Nav className='me-auto'>
                    
//                         <NavItem>
//                             <NavLink to='#1'>Tab1</NavLink>
//                         </NavItem>
//             </Nav>
//             </Collapse>
//         </Navbar>
//     </div>
//   );
// }

// export default HeaderComp;

import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='md' fixed=''>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className='border' isOpen={isOpen} navbar>
          <Nav className="me-auto border" navbar>
            <NavItem>
              <NavLink href="#1">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#2">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText className='border'>Simple Text</NavbarText>
        </Collapse>
        
      </Navbar>
    </div>
  );
}

export default Example;