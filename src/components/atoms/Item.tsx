import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 280,
    height: 280,
    margin: 10,
  },
  media: {
    height: 160,
  },
});

export const Item = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="img/1.jpg" title="サンプルカレー"/>
        <CardContent>
          <Typography>サンプルカレー</Typography>
        </CardContent>
      </CardActionArea>
      <CardContent style={{ paddingTop: "0" }}>
        <Typography variant="body2" color="textPrimary" component="div">
          <Grid container>
            <Grid item xs={6}>
              <strong>M:</strong>
              2000円(税抜)
            </Grid>
            <Grid item xs={6}>
              <strong>L:</strong>
              2000円(税抜)
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};
