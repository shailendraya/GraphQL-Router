import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "components/Container";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import FullHeightContainer from "components/FullHeightContainer";
import Login from "views/Login";
import Register from "views/Register";
import PageNotFound from "views/PageNotFound";
import Main from "views/Main";

const navigation = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Main", href: "/main" },
];

const App = () => {
  return (
    <BrowserRouter>
      <FullHeightContainer>
        <Navbar navigation={navigation} />
        <Container>
          <Routes>
            <Route
              path="login"
              element={
                <Suspense fallback={<>...Loading</>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<>...Loading</>}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="main"
              element={
                <Suspense fallback={<>...Loading</>}>
                  <Main />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<>...Loading</>}>
                  <PageNotFound />
                </Suspense>
              }
            />
          </Routes>
        </Container>

        <Footer />
      </FullHeightContainer>
    </BrowserRouter>
  );
};

export default App;
