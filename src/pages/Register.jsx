import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import { loginSuccess, usernameError, emailError } from "../redux/userRedux";
import { login } from "../redux/apiCalls";
import { emptyCart, } from "../redux/cartRedux";
import { Link } from "react-router-dom";
import { setFlash } from "../redux/flashRedux";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/madsky/image/upload/v1647618879/shop%20images/gettyimages-825961780_thumb1200_4-3_jwfive.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Wrapper2 = styled.div`
  width: 100%;
  padding: 3px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Warning = styled.div`
  padding: 0px;
  background-color: white;
  color: red;
  ${mobile({ width: "75%" })}
`;

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [usernameWarning, setUsernameWarning] = useState('‎');
  const [emailWarning, setEmailWarning] = useState('‎');
  const [passwordWarning, setPasswordWarning] = useState('‎');
  const [password2Warning, setPassword2Warning] = useState('‎');

  const currUser = useSelector(state => state.user)
  const currCart = useSelector(state => state.cart)
  const history = useHistory()
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let sthIsEmpty = false;

    if (username === '') {
      setUsernameWarning('username can not be empty');
      sthIsEmpty = true;
    }

    if (email === '') {
      setEmailWarning('email can not be empty');
      sthIsEmpty = true;
    }

    if (!email.includes('@')) {
      setEmailWarning('email format is not valid');
      sthIsEmpty = true;
    }

    if (password === '') {
      setPasswordWarning('password can not be empty');
      sthIsEmpty = true;
    }

    if (password2 === '') {
      setPassword2Warning('enter password again');
      sthIsEmpty = true;
    }

    if (password2 !== password) {
      setPassword2Warning('repeat password correctly');
      sthIsEmpty = true;
    }

    if (sthIsEmpty) return;


    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password,
    }

    const createUser = async () => {
      try {
        const user = await publicRequest.post('/auth/register', newUser);
        const cart = await publicRequest.post('/cart', {
          userId: user.data._id,
          products: currCart.products,
        });
        dispatch(emptyCart())
        login(dispatch, { username, password });
        dispatch(setFlash(`Successfully registered! Welcome, ${username}!`))
        history.push('/')
      } catch (err) {
        const res = err.response.data.keyPattern;
        if (Object.keys(res).includes('email')) {
          setEmailWarning('email already used')
        }
        if (Object.keys(res).includes('username')) {
          setUsernameWarning('username already used')
        }
        console.log(res)
      }
    }
    createUser();
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {/* <Input placeholder="first name" onChange={e => setFirstname(e.target.value)} />
          <Input placeholder="last name" onChange={e => setLastname(e.target.value)} /> */}
          <Input placeholder="username" onChange={e => { setUsername(e.target.value); setUsernameWarning('‎'); }} />
          <Warning>{usernameWarning}</Warning>
          <Input placeholder="email" type='email' onChange={e => { setEmail(e.target.value); setEmailWarning('‎'); }} />
          <Warning>{emailWarning}</Warning>
          <Input placeholder="password" type='password' onChange={e => { setPassword(e.target.value); setPasswordWarning('‎'); }} />
          <Warning>{passwordWarning}</Warning>
          <Input placeholder="confirm password" type='password' onChange={e => { setPassword2(e.target.value); setPassword2Warning('‎'); }} />
          <Warning>{password2Warning}</Warning>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
        <Wrapper2><Link to='/login'>SIGN IN WITH EXISTING ACCOUNT</Link></Wrapper2>
        <Wrapper2><Link to='/'>BACK TO HOME PAGE</Link></Wrapper2>

      </Wrapper>
    </Container>
  );
};

export default Register;
