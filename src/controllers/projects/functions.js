const path = require('path');
const root = require('../../util/path');

const Project = require('../../models/Project');

const viewProjectGet = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'project.html'));
};

const viewProjectById = async (req, res) => {
    try {
        const result = await Project.findById(req.params.id).exec();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createProjectGet = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'create-project.html'));
};

const constructDate = (day, month, year) => {
    return `${year}-${month}-${day}`;
};

const createProjectPost = async (req, res) => {
    const data = req.body;
    const project = new Project({
        projectName: data['project-name'],
        projectPhase: data.phase,
        projectStartDate: constructDate(data['date-started-day'], data['date-started-month'], data['date-started-year']),
        projectEndDate: constructDate(data['date-ended-day'], data['date-ended-month'], data['date-ended-year']),
        projectDetails: data.details
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.viewProjectGet = viewProjectGet;
module.exports.viewProjectById = viewProjectById;
module.exports.createProjectGet = createProjectGet;
module.exports.createProjectPost = createProjectPost;