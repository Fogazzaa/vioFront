import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostEvento from "./pages/postEventos";
import ListUsuarios from "./pages/listUsuarios";
import ListEventos from "./pages/listEventos";
import ListIngressos from "./pages/listIngressos";
import ListOrganizadores from "./pages/listOrganizadores";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/evento/novo" element={<PostEvento />} />
          <Route path="/usuarios" element={<ListUsuarios />} />
          <Route path="/eventos" element={<ListEventos />} />
          <Route path="/ingressos" element={<ListIngressos />} />
          <Route path="/organizadores" element={<ProtectedRoute><ListOrganizadores /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
