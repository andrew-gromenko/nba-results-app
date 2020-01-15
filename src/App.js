import React from "react";
import styles from "./App.module.scss";

import EventsList from "./components/EventsList";

function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.title}>NBA Scoreboard</h1>
      <EventsList />
    </div>
  );
}

export default App;
