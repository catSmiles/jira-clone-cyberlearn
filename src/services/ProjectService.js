/* eslint-disable no-useless-constructor */
const { baseService } = require('./baseService');

class ProjectService extends baseService {
    constructor() {
        super();
    }
    createProject = (project) => {
        return this.post('/api/Project/createProject', project);
    };

    createProjectAuthorize = (project) => {
        return this.post('/api/Project/createProjectAuthorize', project);
    };
    getAllProject = () => {
        return this.get('/api/Project/getAllProject');
    };
    updateProject = (projectEdited) => {
        return this.put(`/api/Project/updateProject?projectId=${projectEdited.id}`, projectEdited);
    };
    deleteProject = (projectId) => {
        return this.delete(`/api/Project/deleteProject?projectId=${projectId}`);
    };
    assignUserProject = (project) => {
        return this.post('/api/Project/assignUserProject', project);
    };
    removeUserFromProject = (project) => {
        return this.post('/api/Project/removeUserFromProject', project);
    };
}

export const projectService = new ProjectService();
