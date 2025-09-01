import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
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
          <Route path="/evento/novo" element={<ProtectedRoute><PostEvento /></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><ListUsuarios /></ProtectedRoute>} />
          <Route path="/eventos" element={<ProtectedRoute><ListEventos /></ProtectedRoute>} />
          <Route path="/ingressos" element={<ProtectedRoute><ListIngressos /></ProtectedRoute>} />
          <Route path="/organizadores" element={<ProtectedRoute><ListOrganizadores /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
