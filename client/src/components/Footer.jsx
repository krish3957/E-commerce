import { Email, Facebook, Instagram, Phone, Pinterest, Place } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    background-color: #ffdef2;
    height: 200px;
    padding: 20px;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 16px;
`
const Center = styled.div`
    flex: 1;
    padding-left: 40px;
`
const Right = styled.div`
    flex: 1;
    padding-left: 20px;
`

const Desc = styled.div`
    flex:1;
`

const SocialIcons = styled.div`
    flex: 1;
    display: flex;
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    cursor: pointer;
`
const ListTitle = styled.h3`
    font-size: 20px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
`
const Items = styled.li`
    margin-bottom: 10px;
    width: 50%;
    cursor: pointer;
`
const Title = styled.h1`
    font-size: 24px;
`

const ContactList = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`
const ContactItem = styled.div`
    font-size: 18px;
    margin-left: 10px;
`

function Footer() {
    return (
        <Container>
            <Left>
                <Title>ShopDropGo</Title>
                <Desc>Thank you for visiting our website! We strive to provide you with the best experience and information possible.</Desc>
                <SocialIcons>
                    <Icon><Instagram /></Icon>
                    <Icon><Facebook /></Icon>
                    <Icon><Pinterest /></Icon>
                </SocialIcons>
            </Left>
            <Center>
                <ListTitle>Important Links</ListTitle>
                <List>
                    <Items>Home</Items>
                    <Items>Men Section</Items>
                    <Items>Women Section</Items>
                    <Items>Delivery Policy</Items>
                    <Items>Privacy Policy</Items>
                    <Items>Terms and Condition</Items>
                    <Items>Contact Us</Items>
                    <Items>Refund Policy</Items>
                </List>
            </Center>
            <Right>
                <Title>Contact Us</Title>
                <ContactList>
                    <Place />
                    <ContactItem>Surat Gujrat</ContactItem>
                </ContactList>
                <ContactList>
                    <Phone />
                    <ContactItem>+1 9125844568</ContactItem>
                </ContactList>
                <ContactList>
                    <Email />
                    <ContactItem>shopdropgo@gmail.com</ContactItem>
                </ContactList>
            </Right>
        </Container>
    );
}

export default Footer;
