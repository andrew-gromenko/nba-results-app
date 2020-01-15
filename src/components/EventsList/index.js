import React, { useEffect, useState } from "react";
import styles from "./EventsList.module.scss";

import Event from "../Event";

export default () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    const data = setInterval(fetchData, 60000);

    return () => {
      clearInterval(data);
    };
  }, []);

  const fetchData = () =>
    fetch(
      "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard1"
    )
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(data => setEvents(data.events))
      .catch(err => {
        setError(err);
      });

  return (
    <div className={styles.EventsList}>
      {error ? (
        <p>{error.message}</p>
      ) : (
        events.map(event => <Event key={event.uid} event={event} />)
      )}
    </div>
  );
};
