import React, { useEffect, useState, useContext } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { CartContext } from "../utilits/CartContext";

//Получилась большая страница, можно было бы разделить на компоненты: card + cartList

const Basket = () => {
  //provider part

  const [cart, setCart] = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.count,
    0
  );

  //card info part

  const front = document.querySelector(".front");
  const bankLogo = document.querySelector(".bank-logo");
  const brandLogo = document.querySelector(".brand-logo");
  const frontFields = document.querySelectorAll(".front .field");
  const [number, setNumber] = useState('');

  const numberFieldChangeHandler = () => {
    number !== '' &&
      fetch(
        `https://api.cardinfo.online?input=${number
          .replace(/\s+/g, "")
          .trim()
          .slice(0, 6)}&apiKey=791258f60b79de566e04100aefd58671`,
        {
          mode: "cors",
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          front.style.background = data.formBackgroundColor;
          front.style.color = data.formTextColor;
          front.style.borderColor = data.formBorderColor;
          frontFields.forEach(
            (field) => (field.style.borderColor = data.formBorderColor)
          );
          bankLogo.style.display = data.formBankLogoBigSvg ? "block" : "none";
          bankLogo.src = data.formBankLogoBigSvg;
          brandLogo.style.display =
            data.formBrandLogoSvg || data.brandLogoOriginalSvg
              ? "block"
              : "none";
          brandLogo.src = data.formBrandLogoSvg || data.brandLogoOriginalSvg;
        })
        .catch(function (error) {
          console.error(error);
        });
  };

  useEffect(numberFieldChangeHandler, [number]);

  //functions + and -

  const Increase = (name) => {
    setCart((currentState) => {
      currentState.find((item) => item.name === name).count += 1;
      return [...currentState];
    });
  };

  const Decrease = (name) => {
    setCart((currentState) => {
      currentState.find((item) => item.name === name).count -= 1;
      if (currentState.find((item) => item.name === name).count < 1) {
        return [...currentState.filter((item) => item.name !== name)];
      }
      return [...currentState];
    });
  };

  return (
    <Container>
      <Grid container justify="center" alignItems="center" spacing={4}>
        <div className="cards">
          <div className="front card">
            <img className="bank-logo" alt='bank-logo'/>
            <img className="brand-logo" alt='brand-logo'/>
            <div className="fields">
              <input
                className="field number"
                type="text"
                placeholder="0000 0000 0000 0000"
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                maxLength="19"
                autoFocus
                value={
                  number &&
                  number
                    .replace(/\D/g, "")
                    .replace(
                      /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g,
                      "$1 $2 $3 $4"
                    )
                }
              />

              <label className="label">Expires</label>
              <input className="field expired" type="text" maxLength="2" placeholder="MM" />
              <input className="field expired" type="text" maxLength="2" placeholder="YY" />
            </div>
          </div>
          <div className="back card">
            <input className="field code" type="password" maxLength="3" />
            <label className="label">CVV</label>
          </div>
        </div>
      </Grid>
      <Container className="productList">
        <TableContainer component={Paper}>
          <Table >
            <TableBody>
              {cart.map((x,id) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{x.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#b9ddfd",
                          color: "whitesmoke",
                        }}
                        onClick={() => Decrease(x.name)}
                      >
                        <RemoveIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">{x.count}</TableCell>
                    <TableCell align="left">
                      <Button
                        size="small"
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(47, 100, 179)",
                          color: "whitesmoke",
                        }}
                        onClick={() => Increase(x.name)}
                      >
                        <AddIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">{x.price}</TableCell>
                  </TableRow>
                );
              })}
              {cart.length > 0 ? (
                <TableRow>
                  <TableCell align="left">Всего на {totalPrice} руб.</TableCell>
                  <TableCell align="right" colSpan="6">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setCart([])}
                    >
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
};
export default Basket;
