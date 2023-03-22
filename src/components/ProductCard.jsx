import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { DeleteForever, Edit } from "@material-ui/icons";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ product }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      sx={{ maxWidth: 345, minWidth: "100%" }}
      className="group cursor-pointer"
    >
      <div className="h-[430px] lg:h-[355px] w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt="Paella dish"
          className="h-full  w-full object-cover group-hover:scale-110 transition-all"
        />
      </div>

      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{product.name}</h2>
          <h2>₹ {product.price}</h2>
        </div>
        <Typography variant="body2" color="text.secondary">
          {product.description.length > 30
            ? product.description.slice(0, 30) + "..."
            : product.description}
        </Typography>
      </CardContent>
      <div className="flex items-center justify-between w-full px-2 py-3">
        <Button variant="contained">Buy</Button>

        <div>
          <IconButton aria-label="Remove Product">
            <Edit />
          </IconButton>
          <IconButton aria-label="Remove Product">
            <DeleteForever />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
