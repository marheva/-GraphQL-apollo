import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = `http://localhost:9000/graphql`;
const HEADERS = { Authorization: `Bearer ${getAccessToken()}` };

export const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetail on Job {
        id
        title
        description
        company {
            id
            name
        }
        __typename
    }
`;

export const COMPANY_DETAIL_FRAGMENT = gql`
    fragment CompanyDetail on Company {
        id
        name
        description
        jobs {
            id
            title
        }
        __typename
    }
`;

export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
        __typename
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_QUERY = gql`
    query JobsQuery {
        jobs {
            id
            title
            description
            company {
                id
                name
            }
            __typename
        }
        __typename
    }
`;

export const COMPANY_QUERY = gql`
    query CompanyQuery($id: ID!) {
        company(id: $id) {
            ...CompanyDetail
        }
        __typename
    }
    ${COMPANY_DETAIL_FRAGMENT}
`;

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    // defaultOptions: {
    //     query: {
    //         fetchPolicy: `network-only`,
    //     },
    //     mutate: {
    //         fetchPolicy: `network-only`,
    //     },
    //     watchQuery: {
    //         fetchPolicy: `network-only`,
    //     },
    // },
});

// [GET_JOBS]
// async function getJobs() {
//     const query = gql`
//         query {
//             jobs {
//                 id
//                 title
//                 description
//                 company {
//                     id
//                     name
//                 }
//                 __typename
//             }
//             __typename
//         }
//     `;
//     const {
//         data: { jobs },
//     } = await client.query({
//         query: query,
//         fetchPolicy: `network-only`,
//     });

//     return jobs;
// }

// [GET_JOB]
// async function getJob(jobId) {
//     const variables = { id: jobId };

//     const {
//         data: { job },
//     } = await client.query({ query: JOB_QUERY, variables: variables });

//     return job;
// }

// async function getCompany(companyId) {
//     const query = gql`
//         query CompanyQuery($id: ID!) {
//             company(id: $id) {
//                 id
//                 name
//                 description
//                 jobs {
//                     id
//                     title
//                 }
//             }
//         }
//     `;
//     const variables = { id: companyId };

//     const {
//         data: { company },
//     } = await client.query({ query: query, variables: variables });

//     return company;
// }

async function createJob(input) {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInputType!) {
            job: createJob(input: $input) {
                ...JobDetail
            }
        }
        ${JOB_DETAIL_FRAGMENT}
    `;

    const variables = { input: input };
    const context = {
        headers: HEADERS,
    };

    const {
        data: { job },
        errors,
    } = await client.mutate({
        mutation,
        variables,
        context,
        // this function called after the mutation;
        update: (cache, { data: { job } }) => {
            cache.writeQuery({
                query: JOB_QUERY,
                variables: { id: job.id },
                data: { job },
            });
        },
    });

    return { errors, job };
}

export { createJob };
