import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods"
import { addProduct, addId, removeId } from "../redux/cartRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data))
        const dbCart = await publicRequest.get(`/cart/find/${res.data._id}`, {
            headers: {
                token: res.data.accessToken,
            }
        })
        dbCart.data.products.forEach((element) => dispatch(addProduct(element)))
        dispatch(addId(dbCart.data._id))
    } catch (err) {
        console.log(err.response.data)
        dispatch(loginFailure())
    }
}