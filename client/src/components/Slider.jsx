import { ArrowBackOutlined, ArrowForwardOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SliderItems } from '../data';
import { mobile } from '../responsive';

const Container = styled.div`
    margin-top:10px;
    height: 100vh;
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({display:"none"})};
`

const Arrow = styled.div`
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:0;
    bottom: 0;
    margin: auto;
    left:${props => props.direction === "left" && "10px"};
    right:${props => props.direction === "right" && "10px"};
    opacity: 0.5;
    z-index:2;
`

const Wrapper = styled.div`
    height:100%;
    display: flex;
    transform: translateX(${props=>props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props=>props.bg};

`

const ImageContainer = styled.div`
height: 100%;
flex: 1;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`
const Desc = styled.p`
margin: 50PX 0;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
`
const Button = styled.button`
padding:10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;

`

const Image = styled.img`
    height: 100%;
    padding: 1% 30%;
`



const Slider = () => {
    const [slideIndex,setSlideIndex] = useState(0);
    const handleClick=(direction)=>{
        if(direction === "left"){
            setSlideIndex(slideIndex> 0 ? slideIndex - 1 : 2 );
        }
        else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    }
    return (
        
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowBackOutlined />
            </Arrow>
            
            <Wrapper slideIndex={slideIndex}>

            {SliderItems.map((item)=>(
                <Slide bg={item.bg}>
                    <ImageContainer>
                        <Image src={item.img} />
                    </ImageContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc> {item.desc}</Desc>
                        <Button>SHOW NOW</Button>
                    </InfoContainer>
                </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowForwardOutlined />
            </Arrow>
        </Container>
    );
}

export default Slider;
