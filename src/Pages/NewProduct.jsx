import React from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";

function NewProduct({ user }) {
  return (
    <div>
      <Navbar user={user} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});

export default connect(mapStateToProps, null)(NewProduct);
