const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    projectName: {
        type: String,
        required: true
    },
    projectPhase: {
        type: String,
        required: true
    },
    projectStartDate: {
        type: Date
    },
    projectEndDate: {
        type: Date
    },
    projectDetails: {
        type: String
    },
    keyContactName: {
        type: String
    },
    keyContactEmail: {
        type: String
    }
});

module.exports = mongoose.model('Project', ProjectSchema);