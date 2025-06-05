import Hashtag from "../models/hashtags.js";

class HashtagRepository {

    async createHashtag(hashtagData) {
        try {
            const hashtag = await Hashtag.create(hashtagData);
            return hashtag;
        } catch (error) {
            throw new Error('Error creating hashtag: ' + error.message);
        }
    }

    async getHashtagById(hashtagId) {
        try {
            const hashtag = await Hashtag.findById(hashtagId);
            if (!hashtag) {
                throw new Error('Hashtag not found');
            }
            return hashtag;
        } catch (error) {
            throw new Error('Error fetching hashtag: ' + error.message);
        }
    }

    async getAllHashtags() {
        try {
            const hashtags = await Hashtag.find();
            return hashtags;
        } catch (error) {
            throw new Error('Error fetching hashtags: ' + error.message);
        }
    }

    async getHashtagsByName(nameList) {
        try {
            const hashtags = await Hashtag.find({ title: nameList });
            return hashtags;
        } catch (error) {
            throw new Error('Error fetching hashtags by name: ' + error.message);
        }
    }

    async destroyHashtag(hashtagId) {
        try {
            const hashtag = await Hashtag.findByIdAndDelete(hashtagId);
            if (!hashtag) {
                throw new Error('Hashtag not found');
            }
            return hashtag;
        } catch (error) {
            throw new Error('Error deleting hashtag: ' + error.message);
        }
    }

    async bulkCreateHashtags(hashtags) {
        try {
            const createdHashtags = await Hashtag.insertMany(hashtags);
            return createdHashtags;
        } catch (error) {
            throw new Error('Error creating hashtags: ' + error.message);
        }
    }
}

export default HashtagRepository;
