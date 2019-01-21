import React, { Component, Fragment } from 'react';
import { shape, arrayOf, func } from 'prop-types';
import { connect } from 'react-redux';

import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import Topbar from '../components/Topbar';
import setCurrency from '../utils/setCurrency';
import { addProduct, getProducts } from '../actions/products';

const { ipcRenderer } = window.require('electron');

class Products extends Component {

  static propTypes = {
    products: arrayOf(shape({})),
    getProducts: func,
    addProduct: func,
  }

  static defaultProps = {
    products: [],
    getProducts: e => e,
    addProduct: e => e,
  }

  componentDidMount = () => {
    const { getProducts, addProduct } = this.props;
    getProducts();

    ipcRenderer.on('product-saved', (e, args) => {
      addProduct(args);
    });
  }

  render() {
    const { products } = this.props;

    return (
      <Fragment>
        <Topbar />
        <ListGroup>
        {products.length ?
          products.map(item => (
            <ListGroupItem className="rounded-0">
              <div className="d-flex">
                <div className="mr-auto">
                  {item.name}
                  <br />
                  <small>{item.description}</small>
                </div>
                <div>
                  <b>{setCurrency('USD', item.price, 2)}</b>
                  <br />
                  <small>{item.quantity} left</small>
                </div>
              </div>
            </ListGroupItem>
          ))
          :
          (<ListGroupItem className="rounded-0">
            <div className="text-center">
              No products added yet.
            </div>
          </ListGroupItem>
          )}
        </ListGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ products: state.products });

export default connect(mapStateToProps, { getProducts, addProduct })(Products);
