import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import { connect } from "react-redux";
import {
  setAddresses,
  setCategories,
  setProducts,
  setUser,
} from "./redux/actions";
import Home from "./components/home/Home";
import GetUsers from "./utils/getUser";
import DecodeToken from "./utils/decode_token";
import NewProduct from "./components/newProduct/NewProduct";
import getCategories from "./utils/getCategories";
import getProducts from "./utils/getProducts";
import Logout from "./Pages/Logout";
import ModifyProduct from "./components/modifyProduct/ModifyProduct";
import Product from "./components/product/Product";
import PlaceOrder from "./components/placeOrder/PlaceOrder";
import getAddress from "./utils/getAddresses";
import useAuth from "./hooks/useAuth";

function App({ setUser, setCategories, setProducts, setAddresses }) {
  const auth = useAuth();
  useEffect(() => {
    async function fetchUsers() {
      const usersList = await GetUsers();

      const decodedToken = DecodeToken();

      const users = usersList.filter((user) => user.email === decodedToken.sub);
      setUser(users[0]);
    }

    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    async function fetchProducts() {
      const productsList = await getProducts();
      setProducts(productsList);
    }

    async function fetAddress() {
      const ad = await getAddress();
      let formattedAddresses = ad.map((a) => {
        return {
          value: a,
          label: `${a.landmark}->${a.name},${a.city}`,
        };
      });
      setAddresses(formattedAddresses);
    }

    if (auth) {
      fetchUsers();
      fetchCategories();
      fetchProducts();
      fetAddress();
    }
  }, [auth]);

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

          <Route exact path="/place/order">
            <PlaceOrder />
          </Route>

          <Route
            exact
            path="/product/:product_id"
            render={(props) => {
              const product_id = props.match.params.product_id;
              return <Product product_id={product_id && product_id} />;
            }}
          />

          <Route
            exact
            path="/product/update/:product_id"
            render={(props) => {
              const product_id = props.match.params.product_id;
              return <ModifyProduct product_id={product_id && product_id} />;
            }}
          />
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
  setAddresses: (address) => dispatch(setAddresses(address)),
});
export default connect(null, mapDispatchToProps)(App);
