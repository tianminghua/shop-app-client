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
import { Button, Item, Card, Container, Icon } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Header } from "semantic-ui-react";

const Container2 = styled.div``;

const Image = styled.img`

  width: 70px;
  height: 70px;
  z-index: 2;
  object-fit: scale-down;
  margin: 0px 20px 10px 0px;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const User = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const history = useHistory()

    if (!user.isLoggedIn) {
        history.push('/login')
    }

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await publicRequest.get(`/order/find/${user.currentUser._id}`, {
                    headers: {
                        token: user.currentUser.accessToken,
                    }
                })
                setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [])

    const handleCancelOrder = async (order) => {
        try {
            const res = await publicRequest.put(`/order/${order._id}`, {
                userId: order.UserId,
                products: order.products,
                amount: order.amount,
                address: order.address,
                status: 'cancelling',
            },
                {
                    headers: {
                        token: user.currentUser.accessToken,
                    }
                })
        } catch (err) {
            console.log(err)
        }

        try {
            const res = await publicRequest.get(`/order/find/${user.currentUser._id}`, {
                headers: {
                    token: user.currentUser.accessToken,
                }
            })
            setOrders(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    // const handleClick = () => {
    //     dispatch(addProduct({ ...product, quantity }))
    // }

    return (
        <Container2>
            <Announcement />
            <Navbar />
            <Container>
                <Header as='h2' textAlign='center' margintop='20px'>
                    Order History
                </Header>
                <Grid celled >

                    <Grid.Column width={11}>
                        <Item.Group divided >
                            {orders.map((order) => (

                                <Item key={order._id}>
                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header>Order ID : {order._id}</Item.Header>
                                        <Item.Description>Status : {order.status}</Item.Description>
                                        <Item.Description>Order Placed : {order.createdAt.split('T')[0]}</Item.Description>
                                        <Item.Description>Delivery Address : {`${order.address.line1} ${order.address.city} ${order.address.state} ${order.address.postal_code}`}</Item.Description>

                                        <Item.Group>
                                            {order.products.map((product) => (
                                                <Item key={product._id}>
                                                    <Image src={product.img} />

                                                    <Item.Content>
                                                        <Item.Header as='a'>{product.title}</Item.Header>
                                                        <Item.Meta>Quantity : {product.quantity}</Item.Meta>

                                                        <Item.Extra>Unit Price : {product.price} </Item.Extra>
                                                    </Item.Content>
                                                </Item>
                                            ))}
                                        </Item.Group>

                                        <Item.Header>Total : ${order.amount}</Item.Header>
                                        <Item.Extra>
                                            {order.status === 'cancelling'
                                                ? <Header as='h3' disabled>Order Cancellation Processing ...</Header>
                                                : <Button floated='left' onClick={() => { handleCancelOrder(order) }} basic color='red' >Candel Order</Button>
                                            }

                                        </Item.Extra>
                                    </Item.Content>
                                </Item>

                            ))}
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Card fluid>
                            <Card.Content header='User Information' />
                            <Card.Content >
                                Username: {user.currentUser.username}
                            </Card.Content>
                            <Card.Content >
                                Creation Date: {user.currentUser.createdAt.split('T')[0]}
                            </Card.Content>
                            <Card.Content >
                                Email: {user.currentUser.email}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
                <Newsletter />
            </Container>

            <Footer />
        </Container2>
    );
};

export default User;
