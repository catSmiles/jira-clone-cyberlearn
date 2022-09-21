/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class PriorityService extends baseService {
    constructor() {
        super();
    }
    getAll = () => {
        return this.get('/api/Priority/getAll');
    };
}

export const priorityService = new PriorityService();
