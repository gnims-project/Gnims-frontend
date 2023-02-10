import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
const Router = () => {
  return (
    <BrowserRouter>
      <Container>
        <Layout>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </Layout>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
