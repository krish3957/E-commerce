import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    display: flex;
    flex-direction: column;
    ${mobile({ width: "100vh", height: "500px" })};
    align-items: center;
    
`

const Image = styled.img`
    width: 95%;
    height:100%;
    position: absolute;
    flex:1;
    z-index: 1;
    ${mobile({ width: "80vh", height: "100v" })};
`
const Info = styled.h1`
    z-index: 2;
    position: absolute;
    flex:1;
    top:10%;
    color: #fefefe;
`


const Button = styled.button`
    padding:10px;
    background-color:white;
    color: black;
    top:25%;
    position: absolute;
    z-index: 2;
    flex:1;
    color: gray;
    font-weight: 400;
    border-radius: 10%;
    cursor: pointer;
`
const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link style={{ width: "100%", display: 'flex', justifyContent: 'center' }} to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    {item.title}
                </Info>
                <Button>SHOP NOW</Button>
            </Link>
        </Container>

    );
}

export default CategoryItem;
