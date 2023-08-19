import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";

const Container = styled.div`
    width: 100%;
    ${mobile({ width: "100vw",height:"auto"})};
`
const Wrapper = styled.div`
    ${mobile({ width: "100vw",height:"auto",padding:0})};
    padding: 40px;
    display: flex;
    ${mobile({ flexDirection:"Column"})};
    height: 100vh;

`
const ImageContainer = styled.div`
    ${mobile({ width: "100vw",height:"auto",padding:"15px 0"})};
    display: flex;
    justify-content: center;
    flex: 1;
`
const Image = styled.img`
    ${mobile({ width: "90%"})};
    width: 80%;
    height: 100%;
`
const InfoContainer = styled.div`
    flex: 1;
    ${mobile({ padding: "0 15px"})};   
`
const Title = styled.h1`
    font-size: 45px;
`

const Price = styled.span`
    display: flex;
    font-size: 45px;
    font-weight: 300;
    margin-bottom: 20px;
`

const CancelledPrice = styled.span`
    margin-left: 20px;
    font-size: 40px;
    text-decoration: line-through;
`
const Desc = styled.div`
    font-size: 25px;
    margin-bottom: 20px;
`

const FilterContainer = styled.div`
    ${mobile({ width: "90vw"})};
    width: 500px;
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    display: flex;
`

const Colors = styled.div`

    display: flex;
    align-items: center;
`
const FilterColors = styled.div`
    height: 20px;
    width: 20px;
    margin-left: 5px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid black;
    cursor: pointer;
`

const FilterTitle = styled.h3`
    margin: 0;
    margin-right: 20px;
    font-weight: 400;
    font-size: 20px;
`

const Select = styled.select`
    width: 100px;
    height: 30px;

`

const Option = styled.option`
    
`

const AddContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
`

const Amount = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid teal;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`

const AmountContainer = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.button`
    ${mobile({ marginTop:"1vh",padding: "2vh 5vw"})};
    padding: 15px;
    border: 2px solid teal;
    border-radius: 5px;
    cursor: pointer;

    :hover{
        background-color: lightpink;
    }
`

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("https://e-commerce-api-psi.vercel.app/api/products/find/" + id);
                setProduct(res.data);
            }
            catch (err) {
            }
        }
        getProduct(); 
    },
        [id]);

    const handleQuatity = (type) => {
        if (type === "asc") {
            setQuantity(quantity + 1);
        } else {
            (quantity > 1) && setQuantity(quantity - 1);
        }
    }

    const handleClick = () => {
        if(size===null){
            alert('Please Select A Size');
        }
        else if(color === null){
            alert('Please Select A Color');
        }
        else{
            dispatch(addProduct({ ...product, size,color,quantity}));            
        }
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>₹{product.price}
                        <CancelledPrice> ₹1799</CancelledPrice>
                    </Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color:</FilterTitle>
                            <Colors>
                                {product.color?.map((c,index) => (
                                    <FilterColors key={index} color={c} onClick={() => setColor(c)} />
                                ))}
                            </Colors>
                        </Filter>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <Select defaultValue={"Size"} onChange={(e) => setSize(e.target.value)}>
                                <Option disabled>Size</Option>
                                {product.size?.map((s,index) => (
                                    <Option key={index}>{s}</Option>
                                ))}
                            </Select>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuatity("desc")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuatity("asc")} />
                        </AmountContainer>
                    </AddContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                </InfoContainer>
            </Wrapper>
            <NewsLetter />
            <Footer />
        </Container>
    );
}

export default Product;
