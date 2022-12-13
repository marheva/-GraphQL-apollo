// CONTROLLERS
import { Job, Company } from './db.js';

const UNAUTHORIZED_USER_MESSAGE = 'Unauthorized User.';

function rejectIf(condition) {
    if (condition) {
        throw new Error(UNAUTHORIZED_USER_MESSAGE);
    }
}

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

            rejectIf(!userId);
            return Job.create({ ...input, companyId: userCompanyId });
        },
        deleteJob: async (_root, { id: jobId }, context) => {
            const {
                user: { id: userId, companyId: userCompanyId },
            } = context;
            rejectIf(!userId);
            const { companyId: jobCompanyId } = await Job.findById(jobId);

            rejectIf(jobCompanyId !== userCompanyId);
            return Job.delete(jobId);
        },
        updateJob: async (_root, { input }, context) => {
            const { id: jobId } = input;
            const {
                user: { id: userId, companyId: userCompanyId },
            } = context;
            rejectIf(!userId);
            const { companyId: jobCompanyId } = await Job.findById(jobId);
            rejectIf(jobCompanyId !== userCompanyId);
            return Job.update({ ...input, companyId: userCompanyId });
        },
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
