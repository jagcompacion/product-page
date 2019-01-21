import React, { Component } from 'react';

import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';

const { ipcRenderer } = window.require('electron');

class Topbar extends Component{
  toggleNewProduct = () => {
    ipcRenderer.send('toggle-new-product');
  }

  render() {
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/" className="mr-auto">Products</NavbarBrand>
        <Button
          color="light"
          outline
          onClick={this.toggleNewProduct}
        >
          New product
        </Button>
      </Navbar>
    );
  }
}

export default Topbar;
