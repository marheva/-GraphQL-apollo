import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getJob } from '../graphql/queries';

const TEMPORARY_LOADING_COMPONENT = 'Loading...';

function JobDetail() {
    const [job, setJob] = useState(null);
    const { jobId } = useParams();

    useEffect(() => {
        async function fetchJob(jobId) {
            let _job = await getJob(jobId);
            setJob(_job);
        }
        fetchJob(jobId);
    }, [jobId]);

    if (!job) {
        return TEMPORARY_LOADING_COMPONENT;
    }
    return (
        <div>
            <h1 className='title'>{job?.title}</h1>
            <h2 className='subtitle'>{<Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>}</h2>
            <div className='box'>{job?.description}</div>
        </div>
    );
}

export default JobDetail;
