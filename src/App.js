import Header from "./layout/header";
import Hero from "./components/hero";
import Footer from "./layout/footer";
import { Card, CardContent, Container, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("md")]: {
          p: 0,
          display: "block",
        },
      }}
    >
      <Card
        sx={{
          backgroundColor: "transparent",
          margin: "30px",
          height: "90%",
          boxShadow:
            "0px 10px 13px -6px rgba(255,255,255,0.2), 0px 20px 31px 3px rgba(255,255,255,0.14), 0px 8px 38px 7px rgba(255,255,255,0.12)",
          [theme.breakpoints.down("md")]: {
            m: 0,
            height: "auto",
          },
        }}
        elevation={20}
      >
        <CardContent sx={{ height: "100%" }}>
          <Header />
          <Hero />
          <Footer />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
