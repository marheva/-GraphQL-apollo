import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import { getJobs } from '../graphql/queries';

function JobBoard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            let _jobs = await getJobs();
            setJobs(_jobs);
        }
        fetchJobs();
    }, []);

    return (
        <div>
            <h1 className='title'>Job Board</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
