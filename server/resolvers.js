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
        createJob: (_root, { input }, context) => {
            const {
                user: { id: userId, companyId: userCompanyId },
            } = context;

            if (!userId) {
                throw new Error('Unauthorized User.');
            }
            return Job.create({ ...input, companyId: userCompanyId });
        },
        deleteJob: (_root, { id: jobId }, context) => {
            const {
                user: { id: userId },
            } = context;
            if (!userId) {
                throw new Error('Unauthorized User.');
            }
            return Job.delete(jobId);
        },
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
