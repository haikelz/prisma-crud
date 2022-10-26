import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./components/templates/layout";
import "./index.css";
import AddProduct from "./views/addProduct";
import EditProduct from "./views/editProduct";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </Provider>
  </React.StrictMode>
);
