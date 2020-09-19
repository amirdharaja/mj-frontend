import React from 'react';

import axios from 'axios';

import Product from '../containers/Product';
import MainNav from '../containers/Nav';

import { Input, Row, Col, Form, Spinner } from 'reactstrap';
import item_not_found_1 from '../resources/item_not_found_1.jpg';
import juice from '../resources/img1.jpg';
import icon1 from '../resources/icons/icon1.png';
import icon2 from '../resources/icons/icon2.png';
import icon3 from '../resources/icons/icon3.png';

import {BASE_URL, AUTH_TOKEN} from '../store/actions/ActionTypes';
import $ from 'jquery';

window.setTimeout(function () {
  $(".alert").fadeTo(500, 0).slideUp(500, function () {
    $(this).remove();
  });
}, 3000);


class Products extends React.PureComponent {

  state = {
    products: [],
    cart_count: 0,
    isLoading: true,
    messageTitle: '',
    message: '',
    alertType: 'default',
    alertVisible: false,
    filter: {
      search_keyword: '',
      paginate: 12,
      sort: 'A',
    }
  }


  filterInputChanged = event => {
    const filter = this.state.filter;
    filter[event.target.name] = event.target.value;
    this.setState({
      filter: filter
    });
    this.componentDidMount()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  getProducts = (page) => {
    let url = `/products/?page=${page}&paginate=${this.state.filter.paginate}&sort=${this.state.filter.sort}&search_keyword=${this.state.filter.search_keyword}`
    if (AUTH_TOKEN) {
      axios.get(BASE_URL + url, { headers: { 'Authorization': `token ${AUTH_TOKEN}` } })
        .then(response => {
          this.setState({
            products: response.data.data.items,
            category_names: response.data.data.category_names,
            cart_count: response.data.data.cart_count,
            favourite_count: response.data.data.favourite_count,
            isLoading: false,
          })
        })
        .catch(error => {
          if (error.response) {
            this.setState({ message: error.response.data.error, alertColor: 'danger', alertVisible: true, isLoading: false });
          }
          else this.setState({ message: 'Unable to process, please Try again', alertColor: 'danger', alertVisible: true, isLoading: false });
        })
    }
    else {
      axios.get(BASE_URL + url)
        .then(response => {
          this.setState({
            products: response.data.data.items,
            category_names: response.data.data.category_names,
            isLoading: false,
          })
        })
        .catch(error => {
          if (error.response) {
            this.setState({ message: error.response.data.error, alertColor: 'danger', alertVisible: true, isLoading: false });
          }
          else this.setState({ message: 'Unable to Process, please Try again', alertColor: 'danger', alertVisible: true, isLoading: false });
        })
    }
  }

  handleAddFunc = (product) => {
    if (AUTH_TOKEN) {
      if (product.id && product.weeks) {
        axios.post(BASE_URL + '/add/cart/', {
          cart: product
        }, { headers: { 'Authorization': `token ${AUTH_TOKEN}` } })
          .then(response => {
            this.setState({
              message: response.data.message,
              cart_count: response.data.data.cart_count,
              alertType: 'success',
              isLoading: false,
              alertVisible: true
            })
          })
          .catch(error => {
            if (error.response) {
              this.setState({ message: error.response.data.error, alertType: 'danger', alertVisible: true });
            }
            else this.setState({ message: 'Unable to continue, please Try again', alertType: 'danger', alertVisible: true });
          })
      }
      else {
        console.log('Invalid data')
      }
    }
    else {
      this.setState({ message: 'Please Login to continue', alertType: 'warning', alertVisible: true })
    }
  }

  render() {
    return (
      <main className='products'>
        <div style={{ marginTop: '0px', position: 'fixed', zIndex: 9999 }}>
          <MainNav
            cart_count={this.state.cart_count}
          />
        </div>

        <div className='card-list'>

          <div className='items'>

            <div id='item-nav'>
              <Form id="filter-form">
                <Row form>

                  <Col md={3}>
                    <Input
                      type='select'
                      name="paginate"
                      value={this.state.paginate}
                      onChange={this.filterInputChanged}
                    >
                      <option value="12">Show : 12</option>
                      <option value="24">Show : 24</option>
                      <option value="36">Show : 36</option>
                    </Input>
                  </Col>

                  <Col md={3}>
                    <Input
                      type='select'
                      name="sort"
                      value={this.state.sort}
                      onChange={this.filterInputChanged}
                    >
                      <option value="A">Sort By Name (A - Z)</option>
                      <option value="D">Sort By Name (Z - A)</option>
                      <option value="L">Sort By Price (Low - High)</option>
                      <option value="H">Sort By Price (High -Low)</option>
                    </Input>
                  </Col>

                  <Col md={6}>
                    <Input
                      type="search"
                      name="search_keyword"
                      placeholder="Search Product"
                      value={this.state.search_keyword}
                      onChange={this.filterInputChanged}
                    />
                  </Col>

                </Row>

              </Form>

            </div>
            <h3 id='subscriptions-heading'>SUBSCRIPTIONS</h3>
            <div id='subscriptions'>
              <div id='content'>
                <h4 id='title'>Subscriptions are doorstep deliveries that you can plan.</h4>
                <p>
                  You can go for 1, 2 or 3 deliveries a week to stay true to your health commitment.
                  Start a new healthy habit or stick to one,
                  our ready-to-click commitment packs will make it super easy for you.
                </p>
                <div id='icons'>
                <div><img src={icon1} alt='Customizable' /><br/>Customizable</div>
                <div><img src={icon2} alt='Habit Building' /><br/>Habit Building</div>
                <div><img src={icon3} alt='Cost Efficient' /><br/>Cost Efficient</div>
                </div>
                <p>
                  Feel like exploring more or customizing?
                  <a href='tel:+919524284655'>Just click this</a> or <a href='https://api.whatsapp.com/send?phone=+919524284655'>whatsapp 9524284655</a> and our juice officers will build the right subscription at the best rates for you.
                </p>
              </div>
              <div id='juice'><img src={juice} alt='juice' /></div>
            </div>
            {this.state.isLoading ?
              <div id='spnner'>
                <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
              </div>
              :
              <div style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }} >
                {(this.state.products.length !== 0)
                  ? this.state.products.map(product => <Product key={product.id} {...product} addFunc={this.handleAddFunc} />)
                  : <div><h4 style={{ textAlign: 'center', marginTop: '50px' }}><img width='300px' alt='No item found' src={item_not_found_1} /></h4></div>
                }
              </div>
            }
          </div>
        </div>
      </main>
    )
  }
}


export default Products;