import { useQuery } from '@apollo/client';
import { JOBS_QUERY } from '../queries';

export function useJobs() {
    const { data: { jobs = [] } = {}, loading, error } = useQuery(JOBS_QUERY, { fetchPolicy: `network-only` });
    return { jobs, loading, error: Boolean(error) };
}
