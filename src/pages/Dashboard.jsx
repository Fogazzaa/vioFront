import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import api from "../services/axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function getDados() {
      try {
        const responseEventos = await api.getEventos();
        const responseUsuarios = await api.getUsers();

        setEventos(responseEventos.data.eventos);
        setUsuarios(responseUsuarios.data.users);
      } catch (error) {
        console.error("Erro de Merda:", error);
      }
    }
    getDados();
  }, []);

  const eventosPorOrganizador = {};

  eventos.forEach((evento) => {
    const orgId = evento.fk_id_organizador;
    eventosPorOrganizador[orgId] = (eventosPorOrganizador[orgId] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(eventosPorOrganizador),
    datasets: [
      {
        label: "Eventos por Organizador",
        data: Object.values(eventosPorOrganizador),
        backgroundColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const usuariosPorMes = {};
  usuarios.forEach((usuario) => {
    const mes = new Date(usuario.data_nascimento).getMonth() + 1;
    usuariosPorMes[mes] = (usuariosPorMes[mes] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(usuariosPorMes).map((m) => `Mês ${m}`),
    datasets: [
      {
        data: Object.values(usuariosPorMes),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboards</h2>
      <div style={{ width: "600px", marginBottom: 40 }}>
        <Bar data={barData} />
      </div>
      <div style={{ width: "400px" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Dashboard;
