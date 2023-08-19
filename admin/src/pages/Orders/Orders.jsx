import React from 'react';
import styled from 'styled-components';
import { userRequest } from '../../requestMethods';
import { useState } from 'react';
import { useEffect } from 'react';
import dateFormat from 'dateformat';
import {Link} from "react-router-dom";
const Container = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    max-width: 90vw;
    padding: 1vh 0;
    display: flex;

`
const OrderId = styled.p`
    width: 15vw;
    font-weight:${props => props.type === 'title' ? 700 : 500} ;
`
const Quantity = styled.p`
     width: 8vw;
    text-align: center;
    font-weight:${props => props.type === 'title' ? 700 : 500} ;
`
const Amount = styled.p`
     width: 8vw;
    text-align: center;
    font-weight:${props => props.type === 'title' ? 700 : 500} ;
`
const Date = styled.p`
     width: 8vw;
    text-align: center;
    font-weight:${props => props.type === 'title' ? 700 : 500} ;
`
const Status = styled.p`
     width: 8vw;
    text-align: center;
    font-weight:${props => props.type === 'title' ? 700 : 500} ;
`

const Orders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        userRequest.get("/orders").then(result => {
            setOrders(result.data);
        }).catch(err => {
            console.log(err);
        })

    }, [])
    console.log(orders);
    const count = (product) => {
        let c = 0;
        product.map(item => {
            return c = c + item.quantity;
        })
        return c;
    }

    return (
        <Container>
            <Row>
                <OrderId type='title'>
                    OrderId
                </OrderId>
                <Quantity type='title'>
                    Quantity
                </Quantity>
                <Amount type='title'>
                    Amount
                </Amount>
                <Date type='title'>
                    Order Date
                </Date>
                <Status type='title'>
                    Status
                </Status>
                <Date type='title'>
                    Update Date
                </Date>
            </Row>
            {orders.map((item, index) => (
                <Row key={index}>
                    <OrderId>{item.orderId}</OrderId>
                    <Quantity>{count(item.products)}</Quantity>
                    <Amount>{item.amount}</Amount>
                    <Date>{dateFormat(item.createdAt,'dd/mm/yyyy')}</Date>
                    <Status>{item.status}</Status>
                    <Date>{dateFormat(item.updatedAt,'dd/mm/yyyy')}</Date>
                    <Status><Link to={'/order/' + item._id}> Update</Link></Status>
                </Row>
            ))}
        </Container>
    );
}

export default Orders;
