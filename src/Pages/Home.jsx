import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Tab from "../components/Tab";
import AddIcon from "@mui/icons-material/Add";
import PopUp from "../components/PopUp";
function Home({ user, products, filteredProducts }) {
  const [filter, setFilter] = useState("default");

  return (
    <div>
      <Navbar user={user} />
      <div className="px-3 sm:px-16 md:px-32 py-16">
        <div className="flex items-center justify-center">
          <Tab />
        </div>

        <div className="select-header w-full my-6">
          <div className="w-[235px]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value={"default"}>Default</MenuItem>
                <MenuItem value={"high-low"}>Price: High to Low</MenuItem>
                <MenuItem value={"low-high"}>Price:Low to High</MenuItem>
                <MenuItem value={"new"}>Newest</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="products w-full my-12">
          <Grid container spacing={2}>
            {filteredProducts.length > 0
              ? filteredProducts.map((product, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4}>
                      <ProductCard product={product} />
                    </Grid>
                  );
                })
              : products.map((product, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4}>
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
          </Grid>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
        }}
        className="left-[50%] translate-x-[-50%] bottom-10 block md:hidden"
      >
        <Fab variant="extended" color="primary">
          <AddIcon sx={{ mr: 1 }} />
          Add Product
        </Fab>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  products: state.appReducer.products,
  filteredProducts: state.appReducer.filteredProducts,
});

export default connect(mapStateToProps, null)(Home);
