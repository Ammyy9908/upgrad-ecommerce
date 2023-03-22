const intialState = {
  user: null,
  categories: [],
  products: [],
  filteredProducts: [],
};

export default function AppReducer(state = intialState, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.products,
      };
    }
    case "SET_FILTERED_PRODUCTS": {
      return {
        ...state,
        filteredProducts: action.filtered_products,
      };
    }
    case "SET_CATEGORIES": {
      return {
        ...state,
        categories: [...state.categories, ...action.categories],
      };
    }

    default:
      return state;
  }
}
