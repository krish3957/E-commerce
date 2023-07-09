import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const axios = require('axios');




const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: cyan;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    margin-top: 30px;
    width: 250px;
    background-color: black;
    color: white;
    border: 1px solid white;
    padding: 15px 0;
    border-radius: 5%;
    cursor: pointer;
`


const Payment = () => {
    const price = useSelector((state)=>state.cart.amount);

    const KEY = "pk_test_51MnRpySE30x8fvRLL10ngWv0zmppJX955lFrEV5kIFib7baEh2UunP4HBX6H88uztD7Kl7p3WCW9GSDliPlNRkGB00w9cIA1iP";
    const [stripeToken, setToken] = useState(null);
    const handleToken=(token)=> {
        setToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
        try{
            const res =axios.post("http://loaclhost:5000/api/checkout/payment",{
                tokenId:stripeToken.id,
                amount:200000,
            }
            );
            console.log(res.data);
        }
        catch(err){
            console.log(err);

        }
    }

        stripeToken && makeRequest();
    }, [stripeToken,price]);



    

    return (
        <div>
            <Container>
                <StripeCheckout 
                    name="Sev7n Store"
                    description = "Pay for your items"
                    amount={200000}
                    currency="INR"
                    shippingAddress
                    billingAddress
                    token={handleToken}
                    stripeKey={KEY}
                >
                <Button>Pay Now </Button>
                </StripeCheckout>
            </Container>
        </div>
    );
}

export default Payment;

