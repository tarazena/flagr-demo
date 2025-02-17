import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import { Features } from "./pages/Features";
import { User } from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Features />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
