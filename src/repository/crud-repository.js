class CrudRepository {
  constructor(model) {
    this.model = model;
  }

    async create(data) {
        try {
            const document = await this.model.create(data);
            return document;
        } catch (error) {
            throw new Error(`Error creating document: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const document = await this.model.findById(id);
            if (!document) {
                throw new Error('Document not found');
            }
            return document;
        } catch (error) {
            throw new Error(`Error fetching document: ${error.message}`);
        }
    }
    
    async getAll() {
        try {
            const documents = await this.model.find();
            return documents;
        } catch (error) {
            throw new Error(`Error fetching documents: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const document = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!document) {
                throw new Error('Document not found');
            }
            return document;
        } catch (error) {
            throw new Error(`Error updating document: ${error.message}`);
        }
    }

    async destroy(id) {
        try {
            const document = await this.model.findByIdAndDelete(id);
            if (!document) {
                throw new Error('Document not found');
            }
            return document;
        } catch (error) {
            throw new Error(`Error deleting document: ${error.message}`);
        }
    }
}

export default CrudRepository;