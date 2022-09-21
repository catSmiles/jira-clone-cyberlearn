/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class StatusService extends baseService {
    constructor() {
        super();
    }
    getAll = () => {
        return this.get('/api/Status/getAll');
    };
}

export const statusService = new StatusService();
