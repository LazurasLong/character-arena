import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '../components/inputs/Select';

class Payment extends Component {
  componentWillMount() {
    this.setState({ selectedPayment: 'paypal' });
  }

  render() {
    const {
      selectedPayment,
    } = this.state;

    return (
      <div className="Payment">
        <h1 className="Payment-title">Payment tests</h1>

        <select
          name="payment-method"
          className="Select-field"
          ref={(ref) => { this.paymentMethod = ref; }}
          onChange={ () => {this.setState({ selectedPayment: this.paymentMethod.value }); }}
        >
        {
          [
            { slug: 'paypal', name: 'PayPal' },
            { slug: 'visa', name: 'Visa' },
            { slug: 'mastercard', name: 'Mastercard' },
          ].map(opt => {
            return (
              <option
                value={opt.slug}
                key={opt.slug}
              >
                {opt.name}
              </option>
            );
          })
        }
        </select>

        { selectedPayment &&
          <p>You have choose &lt;{selectedPayment}&gt;.</p>
        }

        { selectedPayment && selectedPayment === 'paypal' &&
          <h2>Custom {selectedPayment} section</h2>
        }
        { selectedPayment && selectedPayment === 'visa' &&
          <h2>Custom {selectedPayment} section</h2>
        }
        { selectedPayment && selectedPayment === 'mastercard' &&
          <h2>Custom {selectedPayment} section</h2>
        }
      </div>
    );
  }
};

export default Payment;
