import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    width: 98vw;
`

const Header = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`

`
const Content = styled.div`
    ${mobile({maxWidth:"90vw",margin:"2vh 5vw"})};
    background-color: #F8F8F8;
    max-width: 60vw;
    padding: 1vh 1vw;
    margin: 2vh 19vw;
    display: flex;
    flex-direction: column;
    
`

const Strong = styled.strong`
    font-size: 24px;
`

const P = styled.p`
    font-size: 20px;
    margin: 0;
    
`
const Br = styled.br`
    height:10px;
`

const Shipping = () => {
    return (
      <Container>
        <Header>
            <Title>Shipping Policy</Title>
        </Header>
        <Content>
            <Strong>SHIPPING AND DELIVERY TIME</Strong>
            <br/>
            <P>All orders would be shipped within 1-2 business days (Monday - Friday). Order tracking would be shared to the registered email. Once the order is shipped, allow at least 2-7 days for delivery. The delivery time may vary depending on the area pin-code.</P>
            <br/>
            <Strong>UNDELIVERED ITEMS</Strong>
            <br/>
            <P>In the event that your order cannot be delivered, due to incorrect information or missed deliveries, these orders will be returned to us at our shipping facility. Once your order has been returned to us you will be contacted.</P>
            <br/>
            <Strong>RETURNS & EXCHANGE</Strong>
            <br/>
            <P>All sales are final. We do not accept returns or exchanges at the moment. Please be sure of the size. If you need any help with it, feel free to reach out at ripoff.streetwear@gmail.com or DM us on our </P>
            <a href="https://www.instagram.com/sev7n.in/" title="Instagram ID" rel='noreferrer' target="_blank">instagram page</a>
            <Br></Br>
            <Strong>DAMAGED ITEMS</Strong>
            <Br/>
            <P>If you have received a damaged product, we apologize. We are more than willing to help you out. Please click a picture of the product and email at </P>
            <Br/>
            <Strong>REFUNDS</Strong>
            <P>Refunds are only issued if you have received a damaged product.</P>
            <Br/>
        </Content>
      </Container>  
    );
}

export default Shipping;
