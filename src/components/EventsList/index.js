import React, { useEffect, useState } from "react";
import styles from "./EventsList.module.scss";

import Event from "../Event";

export default () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch(
      "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    )
      .then(res => res.json())
      .then(data => setEvents(data.events));
  }, []);
  return (
    <div className={styles["events-list"]}>
      {events && events.map(event => <Event key={event.uid} event={event} />)}
    </div>
  );
};
