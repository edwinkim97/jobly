import React, { useContext } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  const { currentUser, setCurrentUser } = useContext(UserContext);

  async function handleSubmit() {
   
    let jobId = +id;
    await JoblyApi.applyToJob(currentUser.username, jobId);
   
    let updatedUser = await JoblyApi.getCurrentUser(currentUser.username)
    setCurrentUser(updatedUser);
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
        {!currentUser.applications.includes(id)
          ?
          <button className="btn btn-primary btn-sm apply-btn mt-2"
            onClick={handleSubmit}
          >
            Apply
          </button>
          :
          <button className="btn btn-primary btn-sm apply-btn mt-2"
            disabled={true}
          >
            Applied!
          </button>
        }
      </div>
    </div>
  );
}

/** Render integer salary like '$1,250,343' */

function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}


export default JobCard;