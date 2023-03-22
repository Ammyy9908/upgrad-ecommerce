import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { connect } from "react-redux";
import { setFilteredProducts } from "../redux/actions";

function Tab({ categories, products, setFilteredProducts }) {
  const [alignment, setAlignment] = React.useState("*");
  console.log("CATEGORIES", categories);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    //filter the products here based on category selected
    const filteredProducts =
      newAlignment !== "*"
        ? products.filter((pr) => pr.category === newAlignment)
        : products;
    console.log("FILTERS", filteredProducts);
    setFilteredProducts(filteredProducts);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="*">All</ToggleButton>

      {categories.map((category, index) => {
        console.log("CAT", category);
        return <ToggleButton value={category}>{category}</ToggleButton>;
      })}
    </ToggleButtonGroup>
  );
}

const mapStateToProps = (state) => ({
  categories: state.appReducer.categories,
  products: state.appReducer.products,
});

const mapDispatchToProps = (dispatch) => ({
  setFilteredProducts: (filtered_products) =>
    dispatch(setFilteredProducts(filtered_products)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tab);
