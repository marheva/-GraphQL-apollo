import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries';

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

    return (
        <div>
            <h1 className='title'>{company?.name}</h1>
            <div className='box'>{company?.description}</div>
        </div>
    );
}

export default CompanyDetail;
