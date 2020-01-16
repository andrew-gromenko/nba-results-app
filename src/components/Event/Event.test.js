import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import scoreboard from "../../scoreboard_mock";

import Event from "./index";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with scoreboard data", () => {
  act(() => {
    render(
      <Event
        competitions={scoreboard.events[0].competitions}
        status={scoreboard.events[0].status}
      />,
      container
    );
  });
  expect(container.querySelector("th.linescores:first-child").textContent).toBe(
    "Final"
  );
  expect(container.querySelector(".team-name").textContent).toBe("Celtics");
  expect(container.querySelector(".records").textContent).toBe(
    "(27-12, 16-4, 11-8, home)"
  );
  expect(
    [...container.querySelectorAll(".score")]
      .map(score => score.textContent)
      .join(",")
  ).toBe("24,35,23,21,27,30,34,25");
  expect(container.querySelector(".total-score").textContent).toBe("103");
  expect(container.querySelector(".player-name").textContent).toBe(
    "Gordon Hayward"
  );
  expect(container.querySelector(".player-rating").textContent).toBe(
    "25 PTS, 7 REB, 1 AST, 2 STL"
  );
});

it("renders without scoreboard data", () => {
  act(() => {
    render(<Event />, container);
  });

  expect(container.querySelector(".table-wrapper").textContent).toBe("No data");
  expect(container.querySelector(".performers").textContent).toBe("No data");
});
