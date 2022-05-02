import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import UserContext from "../auth/UserContext";

/**  Makes API call to show all jobs user has applied for.
 * 
 *   State:
 *   - jobs: array of jobs objects, like 
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 * 
 *   App -> Routes -> Applications -> [JobCard, ...]
*/

function Applications() {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(function getJobsWhenMounted() {
    async function getJobs() {
      let appliedJobs;

        let jobsResults = await JoblyApi.request('jobs');
        console.log("APPLICATIONS COMPONENENT JOBS:", jobsResults);
        appliedJobs = jobsResults.jobs.filter(j => currentUser.applications.includes(j.id));
     
      setJobs(appliedJobs);
      setIsLoading(false);
    }
    getJobs();
  }, [currentUser.applications]);

  if (isLoading) return <i>Loading...</i>;

  console.log("APPLICATIONS COMPONENENT JOBS:", jobs);

  return (
    <div className="JobList col-md-8 offset-md-2">
      {jobs.length
        ? (
          <div>
            <h1>Applications</h1>
            <div className="JobList-list">
              <JobCardList jobs={jobs}/>
            </div>
          </div>
        ) : (<p className="lead">No applications yet!</p>)}
    </div>
  );

}

export default Applications;