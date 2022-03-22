import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, ViewColumnTwoTone } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";
import { emptyCart, removeId } from "../redux/cartRedux";
import { setFlash } from "../redux/flashRedux";
import Announcement from "./Announcement";

const Container = styled.div`
  height: 95px;
  margin-bottom: 0px;
  background-color: #eef8f9;
  position: sticky;
  top: 0;
  z-index: 20;
  ${mobile({ height: "150px" })}
`;


const White = styled.div`
  height: 12px;
  background-color: white;
  color: white;
  display: contain;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
  padding: "10px 0px",
  display: "block",
})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ margin: "10px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    dispatch(logOut())
    dispatch(emptyCart())
    dispatch(removeId())
    dispatch(setFlash('Signed out successfully... Cart is saved'))
    history.push('/')
  }

  useEffect(() => {

    const updateCart = async () => {
      try {

        await publicRequest.put(`/cart/${cart.id}`, {
          products: cart.products,
        }, {
          headers: {
            token: user.currentUser.accessToken,
          }
        })

      } catch (err) {
        console.log(err)
      }
    }
    if (cart.id) updateCart()

  }, [cart])

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <Left>
          <Link to={'/products/mouse'}><MenuItem>MOUSE</MenuItem></Link>
          <MenuItem>|</MenuItem>
          <Link to={'/products/keyboard'}><MenuItem>KEYBOARD</MenuItem></Link>
          <MenuItem>|</MenuItem>
          <Link to={'/products/headphone'}><MenuItem>HEADPHONE</MenuItem></Link>
        </Left>
        <Center onClick={() => { history.push('/') }}>
          <Logo>SHOPCYBER</Logo>
        </Center>
        <Right>
          {user.isLoggedIn ? <Link to={'/user'}><MenuItem>ORDER HISTORY</MenuItem></Link> : <Link to={'/register'}><MenuItem>REGISTER</MenuItem></Link>}
          <MenuItem>|</MenuItem>
          {user.isLoggedIn ? <MenuItem onClick={handleCheckOut} >SIGN OUT</MenuItem> : <Link to={'/login'}><MenuItem>SIGN IN</MenuItem></Link>}
          <MenuItem>|</MenuItem>
          <Link to={'/cart'}>
            <MenuItem>
              <Badge badgeContent={cart.quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      <White />

    </Container>
  );
};

export default Navbar;
