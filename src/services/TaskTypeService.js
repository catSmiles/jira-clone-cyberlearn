/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class TaskTypeService extends baseService {
    constructor() {
        super();
    }
    getAll = () => {
        return this.get('/api/TaskType/getAll');
    };
}

export const taskTypeService = new TaskTypeService();
