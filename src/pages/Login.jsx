import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux"
import { login } from "../redux/apiCalls";
import { useHistory } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/madsky/image/upload/v1647699961/shop%20images/Best-144hz-PC-Gaming-Monitors_qad10r.png")
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

const Warning = styled.div`
  padding: 0px;
  background-color: white;
  color: red;
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
  margin-top : 15px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
`;



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameWarning, setUsernameWarning] = useState('‎');
  const [passwordWarning, setPasswordWarning] = useState('‎');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  // const currUser = useSelector(state => state.user)
  // const currCart = useSelector(state => state.cart)

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (username === '') {
      setUsernameWarning('username can not be empty')
    }
    if (password === '') {
      setPasswordWarning('password can not be empty')
    }
    if (username !== '' && password !== '') {
      login(dispatch, { username, password });
    }
    //history.push('/')
  }

  useEffect(() => {
    if (user.isFetching === false && user.error) {
      setUsernameWarning('username or password does not match')
      setPasswordWarning('please try again')
    }
    if (user.isLoggedIn) {
      history.push('/')
    }
  }, [user])

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input type="text" placeholder="username" onChange={(e) => { setUsername(e.target.value); setUsernameWarning('‎'); }} />
          <Warning>{usernameWarning}</Warning>
          <Input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value); setPasswordWarning('‎'); }} />
          <Warning>{passwordWarning}</Warning>
          <Button onClick={handleClick}>LOGIN</Button>
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Wrapper2><Link to='/register'>CREATE A NEW ACCOUNT</Link></Wrapper2>
          <Wrapper2><Link to='/'>BACK TO HOME PAGE</Link></Wrapper2>

        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
