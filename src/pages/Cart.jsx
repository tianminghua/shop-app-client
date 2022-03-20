import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout"
import { useEffect, useState } from "react";
import { userRequest, publicRequest } from "../requestMethods"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { plus, removeProduct, minus } from "../redux/cartRedux";
import { Container, Segment } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";




const STRIPE_PUBLIC_KEY = 'pk_test_51KbFN4FoIfVbp9V9Jx94NfIa68fVcEEbcs0qTj4kjnYJ2YppQOE5ykW6I53k3cTaGV3nLjxF9gyYW2YzCZR016ND00MB1gNWWT'

const Container2 = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 30px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`

  width: 100px;
  height: 100px;
  z-index: 2;
  object-fit: scale-down;
  margin: 0px 10px 10px 0px;
  padding-top: 30px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const RemoveProduct = styled.span`
  margin-top: 13px;
`;

const PriceDetail = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 42vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const [stripeToken, setStripeToken] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  const onToken = (token) => {
    setStripeToken(token)
  }

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product))
  }

  const handlePlus = (product) => {
    dispatch(plus(product))
  }

  const handleMinus = (product) => {
    if (product.quantity > 1) {
      dispatch(minus(product))
    }
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        })
        history.push('/success', {
          cart: cart,
          stripeData: res.data
        })
      } catch (err) {
        console.log(err)
      }
    }
    user.isLoggedIn && stripeToken && makeRequest()
  }, [stripeToken, cart.total, history])

  return (
    <Container2>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper>

          <Title>YOUR CART</Title>
          <Top>
            <Link to='/'>
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
              <TopText>Shopping Bag(2)</TopText>
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
          </Top>
          <Bottom>



            <Info>
              {cart.products.map((product) => (
                <Grid key={product._id}>
                  <Grid.Column width={2}>
                    <Image src={product.img} />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductSize>
                        <b>Color:</b> {product.color}
                      </ProductSize>
                      <ProductSize>
                        <b>Price:</b> $ {product.price}
                      </ProductSize>
                    </Details>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Remove onClick={() => handleMinus(product)} />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Add onClick={() => handlePlus(product)} />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {product.price * product.quantity}
                      </ProductPrice>
                      <RemoveProduct onClick={() => handleRemoveProduct(product)}>
                        <b>Remove</b>
                      </RemoveProduct>
                    </PriceDetail>
                  </Grid.Column>
                </Grid>
              ))}
            </Info>


            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>

              {cart.total > 0 ?
                (<SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 10</SummaryItemPrice>
                </SummaryItem>)
                : null
              }
              {cart.total >= 50 ?
                (<SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>- $ 10</SummaryItemPrice>
                </SummaryItem>)
                : null
              }


              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                {
                  cart.total < 50
                    ? <SummaryItemPrice>$ {cart.total + 10} </SummaryItemPrice>
                    : <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                }
              </SummaryItem>
              {user.isLoggedIn
                ? <StripeCheckout
                  name='TiaN'
                  image='https://res.cloudinary.com/madsky/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1644291379/YelpCamp/xqtw5filprrpbhpawjaa.png'
                  billingAddress
                  shippingAddressdescription={`Your total is $ ${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={STRIPE_PUBLIC_KEY}
                >
                  <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
                : <Link to={'/login'}><Button>LOG IN TO CHECKOUT</Button></Link>

              }

            </Summary>
          </Bottom>

        </Wrapper>
        <Newsletter />
      </Container>
      <Footer />
    </Container2 >
  );
};

export default Cart;
