import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding-left: 40px;
  ${mobile({ display: "none" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  padding-right: 40px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Grid>
        <Grid.Column width={7}>
          <Logo>SHOPCYBER</Logo>
          <Desc>
            Practice E-commerce web app built with MERN Stack.
            Using React and Redux to create an instant response frontend web page.
            Created an independent API backend server with Node.js, Express and MongoDB.
            Using JWT to verify authentication and authorization before sending any request to database.
            Payment function is realized with Stripe.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Grid.Column>
        <Grid.Column width={5}>
          <Title>Useful Links</Title>
          <List>
            <ListItem><Link to={'/'}>Home</Link></ListItem>
            <ListItem><Link to={'/products/mouse'}>Mouse</Link></ListItem>
            <ListItem><Link to={'/cart'}>Cart</Link></ListItem>
            <ListItem><Link to={'/products/keyboard'}>Keyboard</Link></ListItem>
            <ListItem><Link to={'/user'}>Order</Link></ListItem>
            <ListItem><Link to={'/products/headphone'}>Headphone</Link></ListItem>
            <ListItem><Link to={'/products/game'}>Game Device</Link></ListItem>
            <ListItem><Link to={'/products/work'}>Work Device</Link></ListItem>

          </List>
        </Grid.Column>
        <Grid.Column width={4}>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px" }} /> 123 Cyber Street, Boston MA 02215
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }} /> +1 (666) 666-6666
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px" }} /> myemail@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Footer;
