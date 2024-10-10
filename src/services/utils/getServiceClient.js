const {services: servicesList} = require('../service.manifest.json');

const getServiceClient = (service) => {
    const {protocol, hostname, basePath} = servicesList[service];
    return `${protocol}//${hostname.default}${basePath.default}`
};

module.exports = {
    getServiceClient
};
