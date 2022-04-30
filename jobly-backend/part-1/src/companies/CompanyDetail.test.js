import React from "react";
import { render } from "@testing-library/react";
import Company from "./CompanyDetail";
import { MemoryRouter, Route } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Company />
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/company/ibm"]}>
      <Route path="/company/:handle">
        <Company />
      </Route>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
