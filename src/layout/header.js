import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "../assets/images/logo.png";
import { Avatar, Divider, Stack, Typography, useTheme } from "@mui/material";



function CoinView({ logo, name, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
      }}
    >
      <Divider
        orientation="vertical"
        light
        sx={{ height: 24, width: "2px", backgroundColor: "#fff" }}
      />
      <Avatar src={logo} sx={{ width: 24, height: 24 }} alt="Coin logo" />
      <Box sx={{ lineHeight: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {name}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Header() {
  const theme = useTheme();
  return (
    <AppBar
      sx={{ backgroundColor: theme.palette.primary.dark }}
      position="sticky"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <img src={Logo} alt="logo" width={100} />

        <Button variant="contained" color="info">
          Contat wallet
        </Button>
      </Toolbar>
      <marquee
        style={{ backgroundColor: "#000", display: "flex", gap: 2, height: 50 }}
        direction="left"
      >
        <Stack direction="row" spacing={5}>
          {new Array(20)
            .fill({
              logo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
              name: "BTCUSD",
              value: "10,000",
            })
            .map((_, i) => (
              <CoinView key={i} {..._} />
            ))}
        </Stack>
      </marquee>
    </AppBar>
  );
}
