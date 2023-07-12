import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    flex:1;
    margin: 15px;
    position: relative;
    min-width: 320px;
    max-width: 22vw;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fdfd;
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
    display: flex;
`
const Image = styled.img`
    height: 100%;
    width: 100%;
    z-index: 2;
`
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    &:hover{
        opacity: 1;
    }

`
const Icon = styled.div`
    margin: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;

    &:hover{
        background-color: #ffdfee;
        transform: scale(1.1);
    }
`

const Product = ({ item }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product;
