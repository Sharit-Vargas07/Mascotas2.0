import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio.jsx";
import Registro from "./pages/Registro.jsx";
import { NextUIProvider } from "@nextui-org/react";


function App() {

  return (
    <NextUIProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
        </Routes>
    </BrowserRouter >
    </NextUIProvider>
  );
}

export default App;