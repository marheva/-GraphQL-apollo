// CONTROLLERS
import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        job: (_root, { id }) => {
            return Job.findById(id);
        },
        jobs: () => Job.findAll(),
        company: (_root, { id }) => {
            return Company.findById(id);
        },
    },
    Mutation: {
        createJob: (_root, { input }) => Job.create(input),
        deleteJob: (_root, { id: jobId }) => Job.delete(jobId),
        updateJob: (_root, { input }) => Job.update(input),
    },
    Job: {
        // job => parent object (first one);
        company: (_root) => {
            const { companyId = '' } = _root;
            return Company.findById(companyId);
        },
    },
    Company: {
        // on the  job schema we have an `companyId`;
        jobs: ({ id: rootCompanyId }) => Job.findAll(({ companyId: jobCompanyId }) => jobCompanyId === rootCompanyId),
    },
};
