import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useJobDetail } from '../graphql/hooks/useJobDetail';

const TEMPORARY_PRELOADER = 'Loading...';
const TEMPORARY_ERROR = 'Sorry, something went wrong.';

function JobDetail() {
    const { jobId } = useParams();
    const {
        job: { title: jobTitle = '', company: { id: companyId = '', name: companyName = '' } = {}, description: jobDescription = '' },
        loading,
        error,
    } = useJobDetail(jobId);

    if (loading) return <p>{TEMPORARY_PRELOADER}</p>;
    if (error) return <p>{TEMPORARY_ERROR}</p>;

    return (
        <div>
            <h1 className='title'>{jobTitle}</h1>
            <h2 className='subtitle'>{<Link to={`/companies/${companyId}`}>{companyName}</Link>}</h2>
            <div className='box'>{jobDescription}</div>
        </div>
    );
}

export default JobDetail;
