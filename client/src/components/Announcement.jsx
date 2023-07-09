import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 30px;
    background-color:red;
    ${mobile({width:""})}
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

const Announcement = () => {
    return (
        <Container>
            Free Delivery for order above Rs. 4999
        </Container>
    );
}

export default Announcement;
