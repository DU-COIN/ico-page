import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "325ac3cd73b9bd3ada3a3a4520826402",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider  chains={chains}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
