import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        max: [250, 'Content cannot exceed 250 characters']
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment'] // Assuming comments can be on Tweets or Comments
    },
    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
