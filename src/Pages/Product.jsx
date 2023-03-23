import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

//import RemoveItem from "../../../utils/deleteProduct"

const Product = (props) => {
  const navigate = useNavigate();
  const deleteHandler = () => {
    props.setProductId(props.id);
    return props.setOpen(true);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        variant="outlined"
        key={props.id}
        className={`${props.className}`}
        sx={{ maxWidth: 345, minWidth: "100%" }}
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div className="h-[430px] lg:h-[355px] w-full overflow-hidden">
          <img
            src={props.product.imageUrl}
            alt="Paella dish"
            className="h-full  w-full object-cover transition-all"
          />
        </div>
        <CardContent>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{props.product.name}</h2>
            <h2>₹ {props.product.price}</h2>
          </div>
          <Typography variant="body2" color="text.secondary">
            {props.product.description.length > 30
              ? props.product.description.slice(0, 30) + "..."
              : props.product.description}
          </Typography>
        </CardContent>
        <div className="flex items-center justify-between w-full px-2 py-3">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/productdetail/" + props.id, {
                state: { id: props.id, role: props.role },
              });
            }}
          >
            Buy
          </Button>
          <div>
            {props.role === "admin" && (
              <Button
                key={props.id}
                style={{ color: "gray" }}
                onClick={() => {
                  navigate("/modifyproduct/" + props.id, {
                    state: { id: props.id },
                  });
                }}
              >
                {" "}
                <EditIcon />
              </Button>
            )}
            {props.role === "admin" && (
              <Button
                style={{ color: "gray" }}
                onClick={deleteHandler}
                data-id={props.id}
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Grid>
  );
};
export default Product;
