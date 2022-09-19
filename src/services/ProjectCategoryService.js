/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class ProjectCategoryService extends baseService {
  constructor() {
    super();
  }
  getProjectCategory = () => {
    return this.get('/api/ProjectCategory');
  };
}

export const projectCategoryService = new ProjectCategoryService();
