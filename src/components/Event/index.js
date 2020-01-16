import React from "react";
import styles from "./Event.module.scss";

import { isEqual } from "lodash";

export default React.memo(
  ({ competitions, status }) => {
    const isOT = status && status.period === 5; //If overtime was in match
    return (
      <div className={styles.Event}>
        <div className={styles["table-wrapper"]}>
          {competitions ? (
            <table>
              <thead>
                <tr>
                  <th className={styles.linescores}>
                    {status ? status.type.shortDetail : "-"}
                  </th>
                  <th className={styles.linescores}>1</th>
                  <th className={styles.linescores}>2</th>
                  <th className={styles.linescores}>3</th>
                  <th className={styles.linescores}>4</th>
                  {isOT && <th className={styles.linescores}>OT</th>}
                  <th className={styles.linescores}>T</th>
                </tr>
              </thead>
              <tbody>
                {competitions[0].competitors.map(
                  ({
                    id = 1,
                    team = "-",
                    winner = false,
                    homeAway = "-",
                    linescores = ["-", "-", "-", "-"],
                    score = "-",
                    records = "-"
                  }) => (
                    <tr
                      className={winner ? styles.winner : styles.loser}
                      key={id}
                    >
                      <td className={styles["team-info"]}>
                        <img src={team.logo} alt="logo" />
                        <div>
                          <div className={styles["team-name"]}>
                            {team.shortDisplayName}
                          </div>
                          <div className={styles.records}>
                            ({records.map(record => `${record.summary}, `)}
                            <span className={styles["home-away"]}>
                              {homeAway}
                            </span>
                            )
                          </div>
                        </div>
                      </td>
                      {linescores.map((score, id) => (
                        <td className={styles.score} key={id}>
                          {score.value || score}
                        </td>
                      ))}
                      <td className={styles["total-score"]}>{score}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <div>No data</div>
          )}
        </div>
        <div className={styles.video}>
          <video
            controls
            src={
              competitions &&
              competitions[0].headlines[0].video[0].links.source.href
            }
          ></video>
        </div>
        <div className={styles.performers}>
          {competitions ? (
            <>
              <h3>Top performers</h3>
              <ul>
                {competitions[0].competitors.map(({ leaders }) => {
                  return (
                    <li key={leaders[3].leaders[0].athlete.id}>
                      <div className={styles["player-photo"]}>
                        <img
                          src={leaders[3].leaders[0].athlete.headshot}
                          alt={leaders[3].leaders[0].athlete.displayName}
                        />
                      </div>
                      <div>
                        <div className={styles["player-name"]}>
                          {leaders[3].leaders[0].athlete.displayName}
                        </div>
                        <div className={styles["player-rating"]}>
                          {leaders[3].leaders[0].displayValue}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className={styles.error}>No data</div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);
