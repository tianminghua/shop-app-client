import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { removeId, emptyCart } from "../redux/cartRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";


const Success = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    const user = useSelector(state => state.user)

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await publicRequest.post("/order", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        title: item.title,
                        price: item.price,
                        img: item.img,
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                }, {
                    headers: {
                        token: user.currentUser.accessToken,
                    }
                });
                setOrderId(res.data._id);
                dispatch(emptyCart())
            } catch (err) {
                console.log(err)
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? <h3> `Order has been created successfully. Your order number is ${orderId}`</h3>
                : <h3>`Successfull. Your order is being prepared...`</h3>}
            <Link to={'/user'}><Button>VIEW ORDER HISTORY</Button></Link>
            <Link to={'/'}><Button>RETURN TO HOMEPAGE</Button></Link>
        </div>
    );
};

export default Success;