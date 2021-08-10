import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export default function ImgMediaCard(props) {
  const { desc, title, img, link } = props;

  return (
    <Card className="app-card">
      <Link to={link} className="app-card__link">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image={process.env.PUBLIC_URL + "/images/" + img}
            title="Contemplative Reptile"
          />
          <CardContent className="app-card__content">
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
