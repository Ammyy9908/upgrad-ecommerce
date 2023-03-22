import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import { connect } from "react-redux";
import { setCategories, setProducts, setUser } from "./redux/actions";
import Home from "./Pages/Home";
import GetUsers from "./utils/getUser";
import DecodeToken from "./utils/decode_token";
import NewProduct from "./Pages/NewProduct";
import getCategories from "./utils/getCategories";
import getProducts from "./utils/getProducts";
import Logout from "./Pages/Logout";

function App({ setUser, setCategories, setProducts }) {
  useEffect(() => {
    async function fetchUsers() {
      const usersList = await GetUsers();
      console.log(usersList);
      const decodedToken = DecodeToken();
      console.log(decodedToken);

      const users = usersList.filter((user) => user.email === decodedToken.sub);

      console.log(users[0]);
      setUser(users[0]);
    }

    async function fetchCategories() {
      const categories = await getCategories();
      console.log(categories);
      setCategories(categories);
    }
    async function fetchProducts() {
      const productsList = await getProducts();
      console.log(productsList);
      setProducts(productsList);
    }
    fetchUsers();
    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/product/new">
            <NewProduct />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route
            exact
            path="/auth/:type"
            render={(props) => {
              const type = props.match.params.type;
              return <Auth type={type && type} />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setCategories: (categories) => dispatch(setCategories(categories)),
  setProducts: (products) => dispatch(setProducts(products)),
});
export default connect(null, mapDispatchToProps)(App);
