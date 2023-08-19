import React from 'react';
import { categories } from '../data';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import { mobile } from '../responsive';
const Container = styled.div`
    display:flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({width:"80vh" , height:"320vh",flexDirection:"column" ,padding:"10px"})};

`
const Categories = () => {
    return (
        <Container>
            {categories.map((item,index)=>(
                <CategoryItem key={index} item={item}/>
            ))}
        </Container>
    );
}

export default Categories;
