import React, { Suspense } from "react";
import Home from "./components/pages/Home/Home";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound/NotFound";
import Header from "./components/layouts/Header/Header";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addPost" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
