const path = require('path');
const root = require('../../util/path');

const getCollections = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'collections.html'));
};

const testForm = (req, res) => {
    res.render(path.join(root, 'src/views/pages', 'testForm.html'));
};

module.exports.getCollections = getCollections;
module.exports.testForm = testForm;