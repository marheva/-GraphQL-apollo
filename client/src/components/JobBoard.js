import React from 'react';
import JobList from './JobList';
// import { getJobs } from '../graphql/queries';
import { useJobs } from '../graphql/hooks/useJobs';

const TEMPORARY_JOB_BOARD_TITLE = 'Job Board';
const TEMPORARY_ERROR = 'Sorry, something went wrong.';
const TEMPORARY_PRELOADER = 'Loading...';

function JobBoard() {
    const { jobs, loading, error } = useJobs();

    // [EXAMPLE WITHOUT APOLLO CLIENT]
    // useEffect(() => {
    //     getJobs()
    //         .then(setJobs)
    //         .catch((errors) => setError(true));
    // }, []);

    if (loading) return <p>{TEMPORARY_PRELOADER}</p>;
    if (error) return <p>{TEMPORARY_ERROR}</p>;

    return (
        <div>
            <h1 className='title'>{TEMPORARY_JOB_BOARD_TITLE}</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
