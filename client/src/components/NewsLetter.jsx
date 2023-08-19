import { Send } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container =styled.div`
    ${mobile({ width: "94vw",padding:"0 3vw" })};
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title =styled.h1`
    ${mobile({ fontSize:"60px",width: "94vw",padding:"0 3vw",textAlign:"center" })};
    font-size: 70px;
`
const Desc =styled.div`
${mobile({ width: "94vw",padding:"0 3vw",textAlign:"center" })};
font-size: 24px;
margin-bottom: 20px;
`

const InputContainer = styled.div`
${mobile({ width: "94vw",padding:"0 3vw",textAlign:"center" })};
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
