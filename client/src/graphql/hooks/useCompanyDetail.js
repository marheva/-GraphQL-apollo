import { useQuery } from '@apollo/client';
import { COMPANY_QUERY } from '../queries';

export function useCompanyDetail(companyId) {
    const {
        data: { company = {} } = {},
        loading,
        error,
    } = useQuery(COMPANY_QUERY, {
        variables: { id: companyId },
        fetchPolicy: `network-only`,
    });

    return { company, loading, error };
}
