# GraphQL Job Board;

#### How to use React Query with React and GraphQL;

`https://www.takeshape.io/articles/how-to-use-react-query-with-react-and-graphql/`;

#### Folder/Schema Structure with GraphQL;

`https://javascript.plainenglish.io/writing-a-node-js-graphql-backend-that-actually-scales-a-complete-guide-part-1-setup-cddceae25bdc`;

#### JWT.IO allows you to decode, verify and generate JWT;

`https://jwt.io/`

#### additional packages CLIENT:

-   `graphql-request`;
-   `graphql`;
-   `@apollo/client`;

====================================================================================

    ### UDEMY: https://www.udemy.com/course/graphql-by-example/learn/lecture/31846806#overview
    ### UDEMY: https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/12197882#overview

====================================================================================

### Type Definitions (Query, Mutation, Subscription);

    #### they are call `resolvers`:

        -   Query => get;
        -   Mutation => post, put, patch, delete;
        -   Subscription => for Websockets;
        -   {} => the same as Query';

    #### `GraphQL endpoint: http://localhost:${PORT}/graphql`);

    #### `Definitions` => like Routes;
    #### `Resolvers` => like Controllers;

====================================================================================
`ID!` => means `Mandatory` => shouldn't be a null;
`ID` => means `Optional` => should be a null;
`jobs: [Job!]` => means each element in the array can not be null => each element should be object || empty array;

[`Definitions`]

        type Query {
            jobs: [Job!]
        }

        type Job {
            id: ID!
            title: String!
            description: String
        }
         type Mutation {
            createJob(input: CreateJobInputType!): Job
        }

        input CreateJobInputType {
            title: String!
            companyId: ID!
            description: String
        }

[`Resolvers`]
`context` - contains additional resolvers properties;

        export const resolvers = {
            Query: {
                jobs: () => [],
            },
            Mutation: {
                createJob: (_root, { input }) => {
                    return Job.create(input);
                },
            },
        };

[`Postman POST call`]

        query {
            jobs {
                id,
                title,
                description
            }
        }

[`Postman POST call with params(variables)`]

    query JobQuery($id: ID!){
        job(id:$id) {
            id,
            title,
            description,
            company{
                id,
                name
            }
        }
    }

    mutation CreateJobMutation($input:CreateJobInputType!){
        job: createJob(input:$input) {
            id
            title
            company {
                id
                name
            }
        }
    }

[`Request Authentication`]

    const HEADERS = { Authorization: `Bearer ${getAccessToken()}` };
    const { errors, job } = await request(GRAPHQL_URL, query, variables, HEADERS);

## APOLLO

[`Queries`]

    ```
    1.
        *** [`INSTANCE`] ***

        const `client` = new ApolloClient({
            uri: GRAPHQL_URL,
            cache: new InMemoryCache(),
        });

    2.
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
            const { data: { jobs } } = await `client`.query({ query: query });
            return jobs;
        }
    ```

[`Postman (`__typename`)`]

    - unique key to identify each object in the cache;

    ```
        1. `request`
                query JobsQuery {
                    jobs {
                        id,
                        title,
                        description,
                        company {
                            id,
                            name,
                        }
                        __typename
                    }
                     __typename
                }
        2. `response`
                "data": {
                    "jobs": [
                        {
                            "id": "soP9m8MdKeQX_ZXZOCSaL",
                            "title": "Frontend Developer",
                            "description": "We are looking for a Frontend Developer familiar with React.",
                            "company": {
                                "id": "pVbRRBQtMVw6lUAkj1k43",
                                "name": "Facegle"
                            },
                            "__typename": "Job"
                        },
                        "__typename": "Query"
                        ...
                    ]
                }
            }

    ```

[`CACHE`]

    - Apollo caches all query results by default;

[`fetchPolicy`]

    ```
        const {
            data: { jobs },
        } = await client.query({ query: query, fetchPolicy: 'no-cache' });
    ```

    - fetchPolicy:
        - `fetch-first` - default;
        - ...;
        - `network-only` - similar to `no-cache`;
        - `no-cache`;

[`fetchPolicy`,`defaultOptions`, `INSTANCE`]

    -   `query`;
    -   `mutate`;
    -   `watchQuery` - needs for React, like a `observer` => should handle any changes;

    ```
        const `client` = new ApolloClient({
            uri: GRAPHQL_URL,
            cache: new InMemoryCache(),
            defaultOptions: {
                query: {
                    fetchPolicy: `network-only`
                },
                mutate: {
                    fetchPolicy: `network-only`,
                },
                watchQuery: {
                    fetchPolicy: `network-only`,
                },
            }
        });
    ```

[`CACHE update after the request`]

    - writeQuery => cache.writeQuery;

    ```
        const {
            data: { job },
            errors,
        } = await client.mutate({
            mutation,
            variables,
            context,
            // this function called after the mutation;
            update: (cache, result) => {
                const {
                    data: { job },
                } = result;
                cache.writeQuery({
                    query: JOB_QUERY,
                    variables: { id: job.id },
                    data: { job },
                });
            },
        });
    ```

[`fragment`]

    ```
        1.
            query JobQuery($id: ID!) {
                job(id: $id) {
                    ...JobDetail
                }
                __typename
            }

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

        2.
            const JOB_DETAIL_FRAGMENT = gql`
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

        const JOB_QUERY = gql`
            query JobQuery($id: ID!) {
                job(id: $id) {
                    ...JobDetail
                }
                __typename
            }
            ${JOB_DETAIL_FRAGMENT}
        `;

    ```
