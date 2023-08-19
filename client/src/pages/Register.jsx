import { useState } from "react";
import { publicRequest } from "../requestMethod";
import styled from "styled-components";
import Navbar from "../components/Navbar"
import { Navigate } from "react-router-dom";
import { mobile } from "../responsive";
const Container = styled.div`
    ${mobile({ width: "100vw",height:"auto",padding:"5vh 0"})};
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(0,0,0,0.2)) ,url('https://wallpapers.com/images/high/mens-fashion-photography-4p2izmj9ba6dkycl.webp') center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const Wrapper = styled.div`
    ${mobile({ width: "60vw",height:"auto"})};
    width: 40%;
    padding: 20px;    
    background-color: white;
     
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    border-radius: 50px;
    flex: 1;
    border: 1px solid black;
    margin: 20px 10px 0 0 ;
    min-width: 40%;
    padding: 15px;
    background-color: lightgrey;
`

const Title = styled.h1`
    ${mobile({ fontSize:"22px"})};
    font-size: 24px;
    font-weight: 500;
    text-align: center;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`

const Button = styled.button`
    width: 30%;
    padding: 15px 0;
    
    cursor: pointer;
`

const Register = () => {

    const [data, setData] = useState(null);
    const handleChange = (e) => {
        setData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        }
        )
    }

    const [pass, handlePass] = useState('');
    const [cpass, handleCoPass] = useState('');
    const [error, setError] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        if (pass === cpass) {
            const res = publicRequest.post('auth/register', {
                username: data.username,
                email: data.email,
                fname: data.fname,
                lname: data.lname,
                password: pass,
                id: data.username
            }).then((result) => {
                if (result.status === 201) {
                    <Navigate to={'/login'} />
                    alert('Succesful');
                }
            }).catch(err =>{
                setError(err.response.data.message);
                alert(error);
            });
            

        }
        else {
            alert('Conform Password is not same as the Password');
        }
    }
    return (
        <>
        <Navbar/>
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                {error && <p>{error}</p>}
                <Form>
                    <Input placeholder="First Name" name="fname" onChange={handleChange} required/>
                    <Input placeholder="Last Name" name="lname" onChange={handleChange} required/>
                    <Input placeholder="Email" name='email' onChange={handleChange} required/>
                    <Input placeholder="username" name="username" onChange={handleChange} required/>
                    <Input placeholder="Password" onChange={(e) => handlePass(e.target.value)} type="password" required/>
                    <Input placeholder="Confirm Password" onChange={(e) => handleCoPass(e.target.value)} type="password" required/>
                    <Agreement>By creating an account. I consent to the processing of my personal data in accordance
                        with the <b>Privacy Policy</b>
                    </Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
        </>
    );
}

export default Register;
