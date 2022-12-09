# GraphQL Job Board;

====================================================================================

#### How to use React Query with React and GraphQL

# `https://www.takeshape.io/articles/how-to-use-react-query-with-react-and-graphql/`

#### additional packages CLIENT:

-   `graphql-request`;
-   `graphql`

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

====================================================================================
