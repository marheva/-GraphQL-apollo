import React from 'react';
import { useParams } from 'react-router';
import { useCompanyDetail } from '../graphql/hooks/useCompanyDetail';
import JobList from './JobList';

const TEMPORARY_PRELOADER = 'Loading...';
const TEMPORARY_ERROR = 'Sorry, something went wrong.';

function CompanyDetail() {
    const { companyId } = useParams();
    const {
        company: { name: companyName = '', description: companyDescription = '', jobs: companyJobs = [] },
        loading,
        error,
    } = useCompanyDetail(companyId);

    if (loading) return <p>{TEMPORARY_PRELOADER}</p>;
    if (error) return <p>{TEMPORARY_ERROR}</p>;

    return (
        <div>
            <h1 className='title'>{companyName}</h1>
            <div className='box'>{companyDescription}</div>
            <h5 className='title is-5'>Jobs at {companyName}</h5>
            <JobList jobs={companyJobs} />
        </div>
    );
}

export default CompanyDetail;
