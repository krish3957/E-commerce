import './Address.css';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useRazorpay from "react-razorpay";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { mobile } from '../responsive';
const Container = styled.div`
    ${mobile({ width: "100vw",padding:0})};
`

const Wrapper = styled.div`
    ${mobile({ width: "100vw",padding:0})};
    padding: 10vh 15vw 0 15vw;
    width: 70vw;
    height: 80vh;

`
const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: floralwhite;
`

const Row = styled.div`
    ${mobile({ width: "80vw"})};
    display: flex;
    width: 40vw;
    margin: 5vh;
    justify-content: space-between;
`

const Button = styled.button`
    ${mobile({ width: "70vw"})};

    width:250px;
    padding:10px;
    background-color: black;
    color: white;
    font-size: 18px;
    margin-left: -10px;
`

const Buttons = styled.div`
    ${mobile({ width: "80vw",padding:0})};
    width: 99%;
    margin: 10px;
    display: flex;
    
    justify-content: space-between;
`


const Address = () => {


    const [address, saveAddress] = useState({});

    const [add1, saveAdd1] = useState('');
    const [add2, saveAdd2] = useState('');
    const [city, saveCity] = useState('');
    const [state, saveState] = useState('');
    const [country, saveCountry] = useState('');
    const [zipcode, saveZipCode] = useState('');

    const cart = useSelector(state => state.cart);
    const Razorpay = useRazorpay();

    useEffect(()=>{

        const handleAddress = () => {
            saveAddress({
                address_1: add1,
                address_2: add2,
                City: city,
                State: state,
                Country: country,
                ZipCode: zipcode
            });
        }
        handleAddress();
    },[add1,add2,city,state,country,zipcode])
    const navigate = useNavigate();
    const handlePayment = useCallback(async () => {
        
        var order = axios.post('https://e-commerce-api-psi.vercel.app/api/checkout/payment', {
            amount: cart.total * 100

        })


        order.then(order1 => {
            order = order1.data;
        })


        const options = {
            key: "rzp_test_XyIlj5z9luenYH",
            amount: cart.total * 100,
            currency: "INR",
            name: "Sev7n",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: function () {
                navigate('/success',{ state: { address: address, orderId: order.id }});
                window.location.reload();
            },
            notes: {
                address: address
            }

        };

        const rzpay = new Razorpay(options);
        address && rzpay.open();

        rzpay.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.reason);

        })


    }, [cart, Razorpay, address, navigate])


    return (
        <Container>
            <Navbar></Navbar>
            <Wrapper>
                <Form>
                    <Row>
                        <div className="inputbox">
                            <span>Address Line 1</span>
                            <input required="required" name='address_1' type="text" onChange={(e) => saveAdd1(e.target.value)} style={{ maxWidth: '500px' }} />
                            <i />
                        </div>
                    </Row>
                    <Row>
                        <div className="inputbox">
                            <span>Address Line 2</span>
                            <input required="required" name='address_2' type="text" onChange={(e) => saveAdd2(e.target.value)} style={{ maxWidth: '500px' }} />
                            <i />
                        </div>
                    </Row>
                    <Row>
                        <div className="inputbox">
                            <span>City</span>
                            <input required="required" name='city' onChange={(e) => saveCity(e.target.value)} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <span>State</span>
                            <input required="required" name='state' onChange={(e) => saveState(e.target.value)} />
                            <i />
                        </div>
                    </Row>
                    <Row>
                        <div className="inputbox">
                            <span>Country</span>
                            <input required="required" name='country' onChange={(e) => saveCountry(e.target.value)} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <span>ZipCode</span>
                            <input required="required" name='zipcode' onChange={(e) => {
                                saveZipCode(e.target.value);
                                if (zipcode.length > 6) {
                                    alert('enter a valid ZipCode');
                                }
                            }} />
                            <i />
                        </div>
                    </Row>
                </Form>
                <Buttons>
                    <Button onClick={handlePayment}>Checkout</Button>
                </Buttons>
            </Wrapper>
        </Container>
    );
}

export default Address;
