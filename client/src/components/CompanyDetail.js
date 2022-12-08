import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries';
import JobList from './JobList';

const TEMPORARY_LOADING_COMPONENT = 'Loading...';

function CompanyDetail() {
    const { companyId } = useParams();
    const [company, setCompany] = useState([]);

    useEffect(() => {
        async function fetchCompany() {
            let _company = await getCompany(companyId);
            setCompany(_company);
        }
        fetchCompany(companyId);
    }, [companyId]);

    if (!company) return TEMPORARY_LOADING_COMPONENT;

    return (
        <div>
            <h1 className='title'>{company.name}</h1>
            <div className='box'>{company.description}</div>
            <h5 className='title is-5'>Jobs at {company.name}</h5>
            <JobList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetail;
