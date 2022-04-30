import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";


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

  const { asFragment } = render(<JobCardList jobs={jobs} />);
  expect(asFragment()).toMatchSnapshot();
});