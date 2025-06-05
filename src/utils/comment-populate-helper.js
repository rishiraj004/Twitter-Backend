import Comment from '../models/comments.js';

// Recursively populate all nested comments and their users
export async function populateCommentsRecursively(comments) {
    return Promise.all(comments.map(async (comment) => {
        // Populate user
        const populatedComment = await Comment.findById(comment._id)
            .populate('user')
            .populate('likes')
            .populate('comments')
            .lean();
        // If there are nested comments, recurse
        if (populatedComment.comments && populatedComment.comments.length > 0) {
            populatedComment.comments = await populateCommentsRecursively(populatedComment.comments);
        }
        return populatedComment;
    }));
}
