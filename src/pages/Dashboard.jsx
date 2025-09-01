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
        backgroundColor: "rgba(202, 53, 53, 1)",
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboards</h2>
      <div style={{ width: "600px", marginBottom: 40 }}>
        <Bar data={barData} />
      </div>
      <div></div>
    </div>
  );
}

export default Dashboard;
