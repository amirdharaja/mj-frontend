import React, { Component } from 'react';

import MainNav from '../containers/Nav.js'
import { Spinner } from 'reactstrap';

import { connect } from 'react-redux';
import * as userActions from '../store/actions/actions';


class Order extends Component {


  componentDidMount() {
    this.props.getOrders()
  }


  render() {
    return (
      <main>
        <MainNav
          cart_count={this.props.cart_count}
          favourite_count={this.props.favourite_count}
        />
        <div className='orders'>
          <h3 style={{ textAlign: 'center' }}>My Orders</h3>
          {this.props.isLoading
            ?
            <div id='spnner'>
              <Spinner id='spin' style={{ width: '3rem', height: '3rem' }} />
            </div>
            :
            <>
              {this.props.isAuthenticated &&
                <div>
                  <div className='orders__count'>
                    <div className='card orders__count__card'>
                      <h4>Total</h4>
                      <h4>{this.props.orders_count.total}</h4>
                    </div>
                    <div className='card orders__count__card'>
                      <h4>On Going</h4>
                      <h4>{this.props.orders_count.current}</h4>
                    </div>
                    <div className='card orders__count__card'>
                      <h4>Completed</h4>
                      <h4>{this.props.orders_count.delivered}</h4>
                    </div>
                  </div>

                  <div className='orders__orders'>

                    {this.props.ordered_items.length >= 1 ? (
                      <div>
                        {this.props.ordered_items.map(function (item, index) {
                          return (
                            <div key={index}>

                              <div className='orders__orders__items' key={index}>
                                <div className='card orders__orders__items__item'>
                                  <h3>ORDER</h3>
                                  <h4>ID : {item.order_id}</h4>
                                  <h5>TOTAL : ₹ {item.total_cost} </h5>
                                  <h5>PAYMENT : {item.payment}</h5>
                                  <h6>{item.status}</h6>
                                </div>
                                <div className='card orders__orders__items__item'>
                                  <h3>ADDRESS</h3>
                                  <span><strong>{item.address.address_type}</strong></span>
                                  <span>{item.address.home_number}, {item.address.street}</span>
                                  <span>{item.address.landmark}</span>
                                  <span>{item.address.area}</span>
                                  <span>{item.address.city} - {item.address.pincode}</span>
                                </div>
                                <div className='card orders__orders__items__item'>
                                  <h3>ITEMS</h3>
                                  <table>
                                    <tbody>
                                      {item.items.map(function (data, index) {
                                        return (
                                          <tr key={index}>
                                            <td>{data.name}
                                              <span>
                                                <p>{data.weight} - {data.weeks} weeks</p>
                                                <p> [ {data.status} ]</p>
                                              </span>
                                            </td>
                                            <td>
                                              {(new Date(data.start)).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                              })
                                              }
                                              <p>to</p>
                                              {(new Date(data.end)).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                              })
                                              }
                                            </td>
                                            {data.status === 'Alive' ?
                                              <td><Spinner type="grow" id='status-spinner' color="success" /></td>
                                              :
                                              <td><Spinner type="grow" id='status-spinner' color="danger" /></td>
                                            }
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>


                            </div>


                          )
                        })}
                      </div>
                    ) : (
                        <div><h4>No data found</h4></div>
                      )
                    }
                  </div>
                </div>
              }
            </>
          }

          <hr />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return state
}


const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(userActions.getOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
