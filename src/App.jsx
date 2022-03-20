import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Cart from "./pages/Cart";
import User from "./pages/User";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  return (
    //using react-router-dom v5.2.0 not v6
    // v6 does not use switch anymore. totally different
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/products/:category'>
          <ProductList />
        </Route>
        <Route exact path='/product/:id'>
          <Product />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/success'>
          <Success />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/user'>
          <User />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;