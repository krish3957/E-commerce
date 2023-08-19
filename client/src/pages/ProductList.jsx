import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { mobile } from '../responsive';

const Container = styled.div`
    ${mobile({ width: "100vw" })};
`
const Title = styled.h1`
    padding: 0;
    padding-left: 20px;
    margin: 20px;

`
const FilterContainer = styled.div`
    padding: 0 20px;
    display: flex;
    ${mobile({ flexDirection:"Column",padding:0})};
    justify-content: space-between;
`
const Filter = styled.div`
    ${mobile({ width: "90vw",padding:"5vw" ,flexDirection:"Column",margin:0})};
    margin: 20px;
`

const FilterText = styled.span`
    ${mobile({ width: "70vw"})};
    font-size: 20px;
    font-weight: 600;
`

const Select = styled.select`
    ${mobile({ width: "50vw",margin:"5px 0"})};
    padding: 10px;
    margin-left: 10px;
    width: 100px;
`
const Select1 = styled.select`
    padding: 10px;
    margin-left: 10px;
    width: 200px;
`

const Option = styled.option`
    font-size: 16px;
`

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters,setFilters] = useState({});
    const [sort , setSort] = useState("Newest");


    const handleFilters = (e) =>{
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]:value
        }
        )
    };

    
    const handleSort = (e) =>{
        setSort(e.target.value)
    
    }
    return (
        <Container>

            <Navbar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter By:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>green</Option>
                        <Option>yellow</Option>
                        <Option>black</Option>
                        <Option>white</Option>
                        <Option>red</Option>
                    </Select>
                    
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        <Option>XXL </Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>
                        Sort Products:
                        <Select1 onChange={handleSort}>
                            <Option value="Newest">Newest</Option>
                            <Option value="asc">Price(Lowst First)</Option>
                            <Option value="desc">Price(Highest First)</Option>
                        </Select1>
                    </FilterText>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <NewsLetter />
            <Footer />
        </Container>
    );
}

export default ProductList;
