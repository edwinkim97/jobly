import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  const jobs = [
    {
    id: 1,
    title: "test-title",
    salary: 10,
    equity: .10,
    companyName: "company-test"
    },
  ]

  const { asFragment } = render(
      <UserProvider>
        <JobCardList jobs={jobs} />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});