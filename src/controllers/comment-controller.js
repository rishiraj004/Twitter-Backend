import CommentService from '../services/comment-service.js';
const commentService = new CommentService();

class CommentController {
    async createComment(req, res) {
        try {
            const comment = await commentService.createComment(req.query.modelId, req.query.modelType, req.body.userId, req.body.content);
            res.status(201).json({
                message: "Comment created successfully",
                data: comment,
                success: true,
                err: {}
            });
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ 
                err: error.message,
                message: "Error creating comment",
                success: false,
                data: {} 
            });
        }
    }
}

export default CommentController;
