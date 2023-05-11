import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function Repositorios({ match }) {
  //States da aplicação
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);

  const params = useParams();

  //Função que faz a requisição, para buscar dados do repositorio, e das issues!

  useEffect(() => {
    async function load() {
      const newRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`repositorio/${newRepo}`),
        api.get(`repositorio/${newRepo}/issues`),
      ]);

      console.log(params);

      setRepository(repositorioData.data),
        {
          params: {
            state: open,
            per_page: 5,
          },
        };
      setIssues(issuesData.data);

      console.log(repository);
    }

    load();
  }, [match.params.repositorio]);
  return (
    <div className="container">
      <h1>Detalhes...</h1>
    </div>
  );
}
