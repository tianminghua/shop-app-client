import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const shuffleArray = (array) => {
    return array.sort((a, b) => 0.5 - Math.random());
  }
  //fetch products data from API whenever 'cat' changes
  //if there is no cat, fetch all products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/product?category=${cat}`
            : "/product"
        )
        setProducts(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, [cat])

  //filter products by Object filters
  useEffect(() => {
    cat && setFilteredProducts(
      products.filter((item) => Object.entries(filters).every(
        ([key, value]) => item[key] === value
      ))
    )
  }, [products, filters])

  // sort filteredProducts by the value of sort
  useEffect(() => {
    if (sort === 'newset') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      )
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      )
    }
  }, [sort])

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (<Product item={item} key={item._id} />))
        : shuffleArray(products).slice(0, 9).map((item) => (<Product item={item} key={item._id} />))
      }
    </Container>
  );
};

export default Products;
