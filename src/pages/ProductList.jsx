import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { Button } from 'semantic-ui-react'
import { Container } from "semantic-ui-react";

const Container2 = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  //fetch the category info from URL/useLocation
  const location = useLocation();
  const cat = location.pathname.split('/')[2];

  //fetch the filter data from Select and store in filter Object
  const [filters, setFilters] = useState({});
  const handleFiltersChange = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    })
  }

  //fetch Sort rule
  const [sort, setSort] = new useState('newest');

  return (
    <Container2>
      <Announcement />
      <Navbar />
      <Container>
        <Title>Category : {cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFiltersChange}>
              <Option disabled selected value=''>
                Color
              </Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Pink</Option>
            </Select>
            <Select name="connect" onChange={handleFiltersChange}>
              <Option disabled selected value=''>
                Connection
              </Option >
              <Option>Wired</Option>
              <Option>Wireless</Option>
            </Select>
            <Button size='medium' onClick={() => setFilters({})}>Clear</Button>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={e => setSort(e.target.value)}>
              <Option value='newest'>Newest</Option>
              <Option value='asc'>Price (asc)</Option>
              <Option value='desc'>Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Newsletter />
      </Container>

      <Footer />
    </Container2>
  );
};

export default ProductList;
