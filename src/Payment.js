import React from 'react'
import {useState,useEffect} from "react";
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import {useStateValue} from "./StateProvider";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from "react-currency-format";
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{basket,user},dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState(true);

    useEffect (() =>{
        //req and res snippet
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
              
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    },[basket])
        console.log('The secret is', clientSecret);
        const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })

    }


    const handleChange= event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to ="/checkout">{basket?.length} items</Link>)
                </h1>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address :  </h3>
                </div>
                <div className="payment_address">
                    <p> { user?.email}</p>
                    <p>B-6,New York</p>
                    <p>USA</p>
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
                
            </div>
            <div className="payment_section">
                <div className="payment_title">
                        <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    {/*stripe */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment_priceContainer">
                        <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button className="payment_button" disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>

                </div>
            </div>

        </div>
    </div>
    )
}

export default Payment
