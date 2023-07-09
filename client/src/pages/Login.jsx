import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(0,0,0,0.2)) ,url('https://wallpapers.com/images/high/mens-fashion-photography-4p2izmj9ba6dkycl.webp') center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;    
    background-color: white;
     
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

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
    font-size: 24px;
    font-weight: 500;
    text-align: center;
`



const Button = styled.button`
    margin-top: 30px;
    width: 30%;
    padding: 15px 0;
    cursor: pointer;
    :disabled{
        background-color: grey;
        cursor: not-allowed;
    }    
`
const Link = styled.a`
    margin-right: 20px;
    cursor: pointer;
    text-decoration: underline;
`
const Error = styled.span`
    color: red;
`

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { isFetching, error } = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error >Something Went Wrong!!!</Error>}
                </Form>
                
                <Link>FORGOT PASSWORD?</Link>
                <Link>CREATE AN ACCOUNT</Link>
            </Wrapper>
        </Container>
    );
}

export default Login;
