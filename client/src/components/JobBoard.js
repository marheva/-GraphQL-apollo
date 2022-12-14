import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import { getJobs } from '../graphql/queries';

const TEMPORARY_JOB_BOARD_TITLE = 'Job Board';
const TEMPORARY_ERROR = 'Sorry, something went wrong.';

function JobBoard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getJobs()
            .then(setJobs)
            .catch((errors) => setError(true));
    }, []);

    if (error) return <p>{TEMPORARY_ERROR}</p>;
    return (
        <div>
            <h1 className='title'>{TEMPORARY_JOB_BOARD_TITLE}</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
