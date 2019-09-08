import React from 'react';

const styles = {
  jobsRow: {
    height: '8rem',
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    borderBottom: '1px solid #9c9c9c',
    borderTop: '1px solid #9c9c9c',
    color: '#9c9c9c',
    padding: '1rem',
    textAlign: 'left'
  },
  jobs: {
    display: 'flex',
    flexFlow: 'column',
    height: '40rem',
    overflowY: 'scroll',
    width: '100%',
    borderTop: '1px solid #9c9c9c',
    color: '#9c9c9c',
  },
  emptyJobs: {
    color: '#a7a7a7',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '2rem'
  }
};

const JobsRow = ({jobCreatedDate, jobId, flightPlan}) => (
  <div style={styles.jobsRow}>
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <h4>{jobCreatedDate}</h4>
      <p>{flightPlan}</p>
    </div>
    <p style={{alignSelf: 'flex-end'}}>{jobId}</p>
  </div>
);

const RecentJobs = ({recentJobs = []}) => (
  <div style={styles.jobs}>
    <div style={{width: '100%', padding: '1rem', borderBottom: '1px solid #9c9c9c'}}>
      <p style={{fontSize:'20px', fontWeight:"700"}}>Recent Jobs</p>
    </div>

    {(!recentJobs.length) && <div style={styles.emptyJobs}><h4>No recent jobs</h4></div>}
    {(recentJobs.length > 0) && recentJobs.map((job, id) => (
      <JobsRow jobCreatedDate={job.job_created_date} key={id} jobId={job.job_id} flightPlan={job.flight_plan}/>
    ))}
  </div>
);

export default RecentJobs;
