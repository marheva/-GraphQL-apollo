import { request, gql } from 'graphql-request';

const GRAPHQL_URL = `http://localhost:9000/graphql`;

async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                description
                company {
                    name
                }
            }
        }
    `;
    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs;
}

async function getJob(jobId) {
    const query = gql`
        query JobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
    `;
    const variables = { id: jobId };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export { getJobs, getJob };