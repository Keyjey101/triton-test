import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import ProductList from "../utilits/Products";
import ProductItem from "../components/ProductItem";
import Alert from "@material-ui/lab/Alert";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Catalogue = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 600);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Успешно добавлено в корзину
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {ProductList.map((x, id) => {
          return (
            <ProductItem
              name={x.name}
              id={x.id}
              price={x.price}
              key={x.id}
              add={handleClickOpen}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default Catalogue;
