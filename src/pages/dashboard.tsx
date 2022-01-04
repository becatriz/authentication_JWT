import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";

import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

import styles from "../styles/Home.module.css";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.containerContent}>
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <button onClick={signOut} className={styles.buttonSignOut}>Sign Out</button>
      </div>
      <span>{`Olá ${user?.email}`}</span>
      <br />
      <br />
      <Can permissions={["metrics.list"]}>
        <div>MÉTRICAS</div>
      </Can>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  await apiClient.get("/me");

  return {
    props: {},
  };
});
