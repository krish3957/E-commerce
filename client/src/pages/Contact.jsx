import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
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

const Contact = () => {
    return (
        <Container>
            <Navbar />
            <Header>
                <Title>Contact Us</Title>
            </Header>
            <Content>
                <Strong>
                    You Can either-
                </Strong>
                <Br/>
                <P>
                    Email us on - sev7n.in@gmail.com
                </P>
                <Br/>
                <P>
                    Dm Us On Instagram <Link to={'https://www.instagram.com/sev7n.in/'}>@Sev7n.in</Link>
                </P>
                <Br/>
                <P>Address - Khana Chowk, Junavas, Madhapar, Kutch,Gujrat </P>
            </Content>
        </Container>
    );
}

export default Contact;
