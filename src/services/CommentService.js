/* eslint-disable no-useless-constructor */
import { baseService } from './baseService';

class CommentService extends baseService {
  constructor() {
    super();
  }
  getAllComment = () => {
    return this.get('/api/Comment/getAll');
  };
  insertComment = (newComment) => {
    return this.post('/api/Comment/insertComment', newComment);
  };
  deleteComment = (idComment) => {
    return this.delete(`/api/Comment/deleteComment?idComment=${idComment}`);
  };
  updateComment = (commentUpdate) => {
    return this.put(`/api/Comment/updateComment?id=${commentUpdate.id}&contentComment=${commentUpdate.contentComment}`);
  };
}

export const commentService = new CommentService();
