import React, { useEffect, useRef, useState } from "react";
import Logo from ".././assets/images/logo.png";
import {
  Typography,
  Box,
  useTheme,
  Stack,
  Grid,
  IconButton,
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
  InputAdornment,
  MenuItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useAccount } from "wagmi";
import { ethers } from "ethers"; // Import ethers from Ether.js
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EuroIcon from "@mui/icons-material/Euro";
import coin from "../assets/images/Coin.png";
import Big from "big.js";
import "./style.css";
import {
  Busd_Address,
  Coin_Abi,
  Ico_Abi,
  Ico_Address,
  RpcUrl,
  Usdt_Address,
} from "../blockchain/config";
import { WalletConnect } from "../blockchain/wallet";
import { Await } from "react-router-dom";



function Hero(props) {
  const theme = useTheme();
const [Dapp_Provider, setDapp_Provider] = useState(undefined)
const [User_Wallet, setUser_Wallet] = useState(undefined)
  const [values, setValues] = useState({
    coinsold: 123123,
    coinleft: 13123123,
    enteredValue: 1,
    selectedCurrency: "BUSD",
    convertedValue: 0,
  });
  // @ts-ignore
  /* global BigInt */
  const connectWallet = async() => {
    const obj = await WalletConnect();
 setDapp_Provider(obj.signer)
setUser_Wallet(obj.Address)
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };



  const approve = async (tokenAddress, spender, amount) => {
    const contract = new ethers.Contract(tokenAddress, Coin_Abi, Dapp_Provider);
    const accounts = User_Wallet;
    await contract.approve(spender, amount);
  };

  const buyToken = async (tokenAddress, amount) => {
    const contract = new ethers.Contract(Ico_Address, Ico_Abi, Dapp_Provider);
    const accounts = User_Wallet;
    await contract.BuyToken_busd(amount);
  };

  const ButtonControler = async () => {
    try {
      if (Dapp_Provider !== undefined) {
        if (values.selectedCurrency === "USD") {
          if (values.enteredValue === 0) {
            alert("Coin Amount Not selected");
          } else {
            Buy_Usdt();
          }
        }
        if (values.selectedCurrency === "BUSD") {
          if (values.enteredValue === 0) {
            alert("Coin Amount Not selected");
          } else {
            Buy_Busd();
          }
        }
      } else {
        alert("Please Connect To your Wallet First");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Buy_Usdt = async () => {
    try {
      await approve(Usdt_Address, Ico_Address, ethers.BigNumber.from(values.enteredValue).mul(10).pow(18));
      await buyToken(Usdt_Address, ethers.BigNumber.from(values.enteredValue).mul(10).pow(18));
    } catch (error) {
      alert("Error in buy function");
      console.log(error);
    }
  };
  
  
  const Buy_Busd = async () => {
    try {
      await approve(Busd_Address, Ico_Address, ethers.BigNumber.from(values.enteredValue).mul(10).pow(18));
      await buyToken(Busd_Address, ethers.BigNumber.from(values.enteredValue).mul(10).pow(18));
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (<>
    <div
    sx={{ backgroundColor: theme.palette.primary.dark }}

  >
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <img src={Logo} alt="logo" width={100} />
      {Dapp_Provider?(<></>):(<button onClick={connectWallet} className="connect-btn">connect Wallet</button>)}

     
    </Toolbar>
   
   
  </div>
    <section className="hero">
      <Grid container spacing={10} sx={{ height: "100%" }}>
        {/* <Grid item xs={12} md={6}>
          <Stack spacing={4} justifyContent={"center"} height={"100%"}>
            <Box className="content">
              <Typography gutterBottom variant="h2" fontWeight={"bold"}>
                {props.heading}
              </Typography>
              <Typography gutterBottom variant="h2" fontWeight={"bold"}>
                {props.heading}
              </Typography>
            </Box>
            <Typography variant="caption" color={theme.palette.secondary.main}>
              {props.subHeading}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton variant="contained" color="secondary">
                <CurrencyBitcoinIcon />
              </IconButton>
              <IconButton variant="contained" color="secondary">
                <CurrencyExchangeIcon />
              </IconButton>
              <IconButton variant="contained" color="secondary">
                <CurrencyRupeeIcon />
              </IconButton>
              <IconButton variant="contained" color="secondary">
                <EuroIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Grid> */}
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            variant="elevation"
            elevation={5}
            className="coinCard"
            sx={{
              [theme.breakpoints.down("md")]: {
                width: "auto !important",
              },
            }}
          >
            <CardHeader
              sx={{ textAlign: "center" }}
              title={
                <Typography
                  variant="h4"
                  gutterBottom
                  fontWeight={"bold"}
                  color={theme.palette.warning.main}
                >
                  <img src={coin} height={100} width={100} alt="Coin"/>
                </Typography>
              }
              // subheader={
              //   <Typography variant="body2">A TOKEN TO THE DUVERSE</Typography>
              // }
            />
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color={theme.palette.warning.main}
                  >
                    $DUCOIN Sold
                  </Typography>
                  <Box className="wrapperBox">
                    <Typography>{values.coinsold}</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color={theme.palette.warning.main}
                  >
                    $DUCOIN Left
                  </Typography>
                  <Box className="wrapperBox">
                    <Typography>{values.coinleft}</Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <TextField
                  hiddenLabel
                  variant="filled"
                  size="medium"
                  fullWidth
                  id="enteredValue"
                  value={values.enteredValue}
                  onChange={handleChange}
                  type="number"
                  className="textInput"
                  sx={{
                    background: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                  }}
                  InputProps={{
                    style: { padding: 0 },
                    endAdornment: (
                      <InputAdornment sx={{ mr: 0 }} position="start">
                        <TextField
                          select
                          id="selectedCurrency"
                          value={values.selectedCurrency}
                          onChange={handleChange}
                        >
                          {[
                            { label: "$USDT", value: "USDT" },
                            { label: "$BUSD", value: "BUSD" },
                          ].map((option, i) => (
                            <MenuItem key={i} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  hiddenLabel
                  disabled
                  variant="filled"
                  size="medium"
                  fullWidth
                  value={values.enteredValue * 12}
                  className="textInput"
                  sx={{
                    background: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Typography>$COIN</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </CardContent>
            <CardContent>
              <center>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={ButtonControler}
                >
                  Buy Coin
                </Button>
              </center>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section></>
  );
}

Hero.defaultProps = {
  heading: "BUY",
  heading: "DU-COIN.",
  subHeading: `Join the DU-COIN revolution and unlock a new era of decentralized finance!`,
};



export default Hero;
