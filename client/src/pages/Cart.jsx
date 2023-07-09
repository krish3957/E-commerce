import React from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import styled from 'styled-components';
import Footer from '../components/Footer';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TopButton = styled.button`
    padding: 15px;
    font-weight: 600;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "white"};
    color: ${props => props.type === "filled" && "white"};
`

const Botttom = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
`

const TopTexts = styled.div`

`

const TopText = styled.span`
    text-decoration: underline;
    margin: 0 10px;
`

const Info = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column ;
`



const Product = styled.div`
    display: flex;
    margin: 20px 0;
`

const ProductDetail = styled.div`
    flex: 1.5;
    display: flex;
    
`

const PriceDetail = styled.div`
    flex: 1;
`

const ProductName = styled.div``

const ProductColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid black;
`

const Image = styled.img`
    width: 200px;
    height: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductSize = styled.div`
    
`
const ProductID = styled.div``

const ProductAmountContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
    align-items: center;
`

const ProductAmount = styled.div`
    width: 33%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
`

const ProductPrice = styled.h1`
    font-size: 35px;
    font-weight: 300;
`

const Hr = styled.div`
    background-color: black;
    border: 1px solid black;
    opacity: 0.1;
`

const Summary = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 350px;
    justify-content: space-between;
    border: 1px solid lightgray;

`

const SummaryTitle = styled.h1`
    text-align: center;
`

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: ${props => props.type === "total" && 700};
`
const SummaryItemText = styled.div``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    padding: 5px;
    font-size: 22px;
    font-weight: 500;
    width: 400px;
    background-color: ${props=>props.type === "filled" ? "black" : "gray"};
    color: #fff;
`

const Cart = () => {
    const cart = useSelector(state => state.cart);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>SHOPPING BAG({cart.quantity})</TopText>
                        <TopText>YOUR WISHLIST(0)</TopText>
                    </TopTexts>
                    <Link to={'/address'}><Button>Checkout Now</Button></Link>
                </Top>
                <Botttom>
                    <Info>
                        {cart.products.map((product,index) => (
                            <Product key={index}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product: </b>{product.title}</ProductName>
                                        <ProductID><b>ID: </b>{product._id}</ProductID>
                                        <b>Color:</b><ProductColor color={product.color} />
                                        <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                    </ProductAmountContainer>
                                    <ProductPrice>₹ {product.price}</ProductPrice>
                                </PriceDetail>
                                <Hr />
                            </Product>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>SubTotal</SummaryItemText>
                            <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Charges</SummaryItemText>
                            <SummaryItemPrice>₹100</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Charges Discount</SummaryItemText>
                            <SummaryItemPrice>-₹100</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>SubTotal</SummaryItemText>
                            <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Link to={'/address'}><Button type='filled'>Checkout Now</Button></Link>
                    </Summary>
                </Botttom>
            </Wrapper>
            <Footer />
        </Container>
    );
}

export default Cart;