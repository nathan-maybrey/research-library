const path = require('path');
const root = require('../../util/path');

const projectValidation = require('../../../lib/validations/createProjectValidation');
const documentValidation = require('../../../lib/validations/createDocumentValidation');

const Project = require('../../models/Project');
const Document = require('../../models/Document');

const viewAllProjects = async (req, res) => {
    try {
        const projects = await Project.find(
                { 
                    projectName: { $regex: `${req.query['keywords'] || ''}`, $options: 'i' },
                    projectPhase: { $regex: `${req.query['phase'] || ''}`, $options: 'i' }
                }
            ).exec();
        res.render(path.join(root, 'src/views/pages', 'projects.html'), { projects: projects, user: req.user });
    } catch (error) {
        res.status(500).send(error);
    }
}

const viewProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).exec();
        const documents = await Document.find({ projectId: req.params.id })

        res.render(path.join(root, 'src/views/pages', 'projectNew.html'), { project: project, user: req.user, documents: documents });
    } catch (error) {
        res.status(500).send(error);
    }
}

const createProjectGet = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'create-project.html'), { user: req.user });
};

const createProjectPost = async (req, res) => {

    const errors = projectValidation.createProjectValidation(req.body);

    if(Object.keys(errors).length === 0){
        const data = req.body;

        const project = new Project({
            projectName: data['project-name'],
            projectDetails: data.details,
            projectPhase: data.phase
        });

        try {
            const newProject = await project.save();
            res.redirect(`/projects/${newProject.id}`);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.render(path.join(root, 'src/views/pages', 'create-project.html'), { user: req.user, errors: errors });
    }
};

const searchProjects = async (req, res) => {

    const data = req.body;

    console.log(data);

    try {
        const projects = await Project.find({}).exec();
        res.render(path.join(root, 'src/views/pages', 'projects.html'), { projects: projects, user: req.user });
    } catch (error) {
        res.status(500).send(error);
    }

};

const createDocumentGet = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'create-document.html'), { user: req.user });
};

const createDocumentPost = async (req, res) => {
    const errors = documentValidation.createDocumentValidation(req.body);

    console.log(req.params);

    if(Object.keys(errors).length === 0){
        const data = req.body;

        const document = new Document({
            documentName: data['document-name'],
            documentLink: data['document-link'],
            documentType: data['document-type'],
            projectId: req.params.id
        });

        try {
            const newDocument = await document.save();
            console.log(newDocument);
            // res.redirect(`/projects/${newProject.id}`);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.render(path.join(root, 'src/views/pages', 'create-document.html'), { user: req.user, errors: errors });
    }
};

module.exports.viewAllProjects = viewAllProjects;
module.exports.viewProjectById = viewProjectById;
module.exports.createProjectGet = createProjectGet;
module.exports.createProjectPost = createProjectPost;
module.exports.searchProjects = searchProjects;
module.exports.createDocumentGet = createDocumentGet;
module.exports.createDocumentPost = createDocumentPost;