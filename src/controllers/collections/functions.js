const path = require('path');
const root = require('../../util/path');

const Project = require('../../models/Project');

const getCollections = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'collections.html'));
};

const testForm = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'testForm.html'));
};

const submitTestForm = async (req, res) => {
    const project = new Project({
        projectName: "testName",
        projectPhase: "Alpha"
    });

    try {

        const newProject = await project.save();
        res.status(201).json(newProject);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getCollections = getCollections;
module.exports.testForm = testForm;
module.exports.submitTestForm = submitTestForm;
