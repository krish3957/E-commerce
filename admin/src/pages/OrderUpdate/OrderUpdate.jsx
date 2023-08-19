import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { userRequest } from '../../requestMethods';
import { useEffect } from 'react';
import dateFormat from 'dateformat';
const Container = styled.div`
    padding:2vw;
    width: 80vw;
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;

`

const Date = styled.p`
     width: 8vw;
    text-align: center;
    font-weight:${props => props.type === 'title' ? 700 : 500} ;
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
    margin-left: 10px;
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


const OrderUpdate = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [order, setOrder] = useState({});
    const [user,setUser] = useState();

    console.log(id);
    useEffect(() => {
        userRequest.get(`/orders/${id}`).then(result => {
            setOrder(result.data);
        
        });
    }, [id]);
    useEffect(() => {
        const userId = order.userId;
        userRequest.get(`/user/${userId}`).then(result => {
            setUser(result.data);
        });
    }, [order]);
    
    console.log(order);
    console.log(user);
    return (
        <Container>
            <Row>
                <strong>Order Id:</strong>
                <p>{order.orderId}</p>
            </Row>
            <Row>
                <strong>Date</strong>
                <Date>{dateFormat(order.createdAt,'dd/mm/yyyy')}</Date>
            </Row>
            <Row>
                <strong>User Id:</strong>
                <p>{order.userId}</p>
            </Row>
            <Row>
                <strong>User:</strong>
                { user && <p>{user.fname}</p>}
                { user && <p>{user.lname}</p>}
            </Row>
            <Row>
                <strong>User Email:</strong>
                {user && <p>{user.email }</p>}
            </Row>
            <Row>
            <strong>Amount:</strong>
                <p>{order.amount}</p>
            </Row>
            <Row>
                {order.products && order.products.map((product,index) =>(
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
            </Row>
            <Row>
                <strong>Address</strong>
            </Row>
            {order && order.address &&<Row>
                <p style={{marginRight:"5px"}}>{order.address.address_1},</p>
                <p style={{marginRight:"5px"}}>{order.address.address_2},</p>
                <p style={{marginRight:"5px"}}>{order.address.City},</p>
                <p style={{marginRight:"5px"}}>{order.address.State},</p>
                <p style={{marginRight:"5px"}}>{order.address.ZipCode}</p>
            </Row>}
        </Container>
    );
}

export default OrderUpdate;
