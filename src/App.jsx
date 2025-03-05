import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostEvento from "./pages/postEventos";
import ListEventos from "./pages/listEventos";
import ListIngressos from "./pages/listIngressos";
import ListOrganizadores from "./pages/listOrganizadores";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/evento/novo" element={<PostEvento />} />
          <Route path="/eventos" element={<ListEventos />} />
          <Route path="/ingressos" element={<ListIngressos />} />
          <Route path="/organizadores" element={<ListOrganizadores />} />
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
