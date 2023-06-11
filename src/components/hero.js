import React, { useState } from "react";
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
} from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EuroIcon from "@mui/icons-material/Euro";
import "./style.css";

function Hero(props) {
  const theme = useTheme();
  const [values, setValues] = useState({
    coinsold: 123123123123,
    coinleft: 13123123,
    enteredValue: 1,
    selectedCurrency: "BUSD",
    convertedValue: 0,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues((previous) => ({ ...previous, [id]: value }));
  };

  return (
    <section className="hero">
      <Grid container spacing={10} sx={{ height: "100%" }}>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
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
                  DuCoin
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
                  value={234234}
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
                <Button variant="contained" color="warning" size="large">
                  Submit
                </Button>
              </center>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
}

Hero.defaultProps = {
  heading: "BUY",
  heading:"DU-COIN.",
  subHeading: `Join the DU-COIN revolution and unlock a new era of decentralized finance!`,
};

export default Hero;
