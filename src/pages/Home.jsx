import React, { useCallback, useEffect, useState } from "react";
import { FaBars, FaGithub, FaTrash } from "react-icons/fa";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineReload } from "react-icons/ai";
import styles from "./styles/home.module.css";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  // abaixo são states que serão administrados durante a aplicação
  const [text, setText] = useState("");
  const [repository, setRepository] = useState([]);
  const [load, setLoad] = useState(false);

  // Função usada para renderizar na tela os itens que estarão salvos no storage
  useEffect(() => {
    const repo = localStorage.getItem("repos");

    if (repo) {
      setRepository(JSON.parse(repo));
    }
  }, []);

  // Função usada para salvar todos os itens que forem adicionados como repositórios, dentro do storage
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repository));
  }, [repository]);

  // A função abaixo, tem como objetivo fazer uma requisição para consumir uma API, em caso de erro, temos a opção de tratar, e realizamos a gerência do loading(enquanto carrega a requisição)
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoad(true);

        try {
          const response = await api.get(`repos/${text}`);

          const data = {
            name: response.data.full_name,
          };

          setRepository([...repository, data]);
          setText("");
        } catch (error) {
          console.log(error);
          alert(error);
        } finally {
          setLoad(false);
        }
      }
      submit();
    },
    [text, repository]
  );

  // Esta função tem o objetivo de remover o item selecionado da tela
  const deleteTech = useCallback((repo) => {
    const find = repository.filter((r) => r.name !== repo);
    setRepository(find);
  }, []);

  //Código Jsx da aplicação

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <FaGithub className={styles.icon} />
        <h1>Meus Repositórios</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Adicionar Repositórios"
        />

        <button className={styles.btn} type="submit">
          {load ? <AiOutlineReload /> : <GrFormAdd />}
        </button>
      </form>
      <ul className={styles.list}>
        {repository.map((repo) => {
          return (
            <li key={repo.name} className={styles.tech}>
              <div className={styles.title}>
                <FaTrash
                  className={styles.delete}
                  onClick={() => deleteTech(repo.name)}
                />
                <span>{repo.name}</span>
              </div>
              <Link to={`repositorios/${encodeURIComponent(repo.name)}`}>
                <FaBars className={styles.bars} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
