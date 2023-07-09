import { Send } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${mobile({width:"100vh"})};
`
const Title =styled.h1`
    font-size: 70px;
`
const Desc =styled.div`
font-size: 24px;
margin-bottom: 20px;
`

const InputContainer = styled.div`
margin-bottom: 40px;
display: flex;
width: 50%;
height: 40px;
justify-content: space-between;
align-items: center;
`
const Input = styled.input`
    flex: 9;
    height: 100%;
    padding-left: 20px;
`
const Button = styled.button`
    background-color: lightblue;
    flex: 1;
    height: 115%;
    border: none;
    border: 1px solid black;
    cursor: pointer;
`
const NewsLetter = () => {
    return (
        <Container>
            <Title>
                Subscribe Now
            </Title>
            <Desc>
                So you don't miss the latest updates
            </Desc>
            <InputContainer>
                <Input placeholder='Enter Email'/>
                <Button type='Submit'><Send/></Button>
            </InputContainer>
        </Container>
    );
}

export default NewsLetter;
