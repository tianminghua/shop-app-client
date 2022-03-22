import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { Card } from "semantic-ui-react";
import { Container, Grid } from "semantic-ui-react";

const Container2 = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1.5;
`;

const Image = styled.img`
  width: 80%;
  height: 70vh;
  object-fit: scale-down;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  //fetch the category info from URL/useLocation
  const location = useLocation()
  const id = location.pathname.split('/')[2];

  const [product, setProduct] = useState({})
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/product/find/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProduct()
  }, [id])

  const handleClick = () => {
    dispatch(addProduct({
      _id: product._id,
      title: product.title,
      color: product.color,
      price: product.price,
      img: product.img,
      quantity
    }))
  }

  return (
    <Container2>
      <Navbar />
      <Wrapper>
        <Container>
          <Grid columns={2} >
            <Grid.Column>
              <ImgContainer>
                <Image src={product.img} />
              </ImgContainer>
            </Grid.Column>
            <Grid.Column>
              <Card fluid >
                <Card.Content header={product.title} />
                <Card.Content extra>
                  {product.desc}
                </Card.Content>
                <Card.Content description={`Price: $ ${product.price}`} />
                <Card.Content description={`Color: ${product.color}`} />

                <Card.Content extra>
                  <AmountContainer>
                    <Remove onClick={() => { quantity > 1 && setQuantity(quantity - 1) }} />
                    <Amount>{quantity}</Amount>
                    <Add onClick={() => { setQuantity(quantity + 1) }} />
                  </AmountContainer>
                </Card.Content>
                <Button onClick={handleClick} >ADD TO CART</Button>
              </Card>
            </Grid.Column>
          </Grid>
          <Newsletter />
        </Container>
      </Wrapper>

      <Footer />
    </Container2>
  );
};

export default Product;
