import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Package from "./pages/Package";
import Doc from "./pages/Doc";
import APIVersion from "./pages/APIVersion.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package/:packageId" element={<Package />} />
        <Route path="/package/:packageId/api/:apiVersionId" element={<APIVersion />} />
        <Route path="/doc/:page" element={<Doc />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
