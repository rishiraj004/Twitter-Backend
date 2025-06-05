import { LikeService } from '../services/index.js';

const likeService = new LikeService();

class LikeController {
    async toggleLike(req, res) {
        const { modelId, modelType } = req.query;
        const userId = req.body.userId;

        try {
            const result = await likeService.toggleLike(modelId, modelType, userId);
            res.status(200).json({
                message: result.message,
                isAdded: result.isAdded,
                success: true,
                err: {}
            });
        } catch (error) {
            res.status(500).json({
                err: error.message,
                message: "Error toggling like",
                success: false,
                data: {}
            });
        }
    }
}

export default LikeController;
