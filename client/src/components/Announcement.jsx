import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 30px;
    background-color:red;
    ${mobile({ width: "100vw" })};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

const Announcement = () => {
    return (
        <Container>
            Free Delivery for all the orders
        </Container>
    );
}

export default Announcement;
