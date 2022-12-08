import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (root, { id }) => {
            return Job.findById(id);
        },
        jobs: () => Job.findAll(),
        company: (root, { id }) => {
            return Company.findById(id);
        },
    },
    Job: {
        // job => parent object (first one);
        company: (root) => {
            const { companyId = '' } = root;
            return Company.findById(companyId);
        },
    },
};
