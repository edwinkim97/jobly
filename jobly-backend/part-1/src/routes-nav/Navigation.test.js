import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navigation from "./Navigation";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

