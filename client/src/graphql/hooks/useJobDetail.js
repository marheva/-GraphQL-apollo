import { useQuery } from '@apollo/client';
import { JOB_QUERY } from '../queries';

export function useJobDetail(jobId) {
    const {
        data: { job = {} } = {},
        loading,
        error,
    } = useQuery(JOB_QUERY, {
        variables: { id: jobId },
        fetchPolicy: `network-only`,
    });

    return { job, loading, error };
}
