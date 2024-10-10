#!/usr/bin/env node

const yargs = require("yargs");
var fs = require('file-system');

const options = yargs
  .usage("Usage: Command line interface to be used with dgverse repos. Find more details in readme")
  .option("p", { alias: "project", describe: "Project name", type: "string", demandOption: true })
  .option("m", { alias: "mode", describe: "Creating new components and helpers", type: "string", demandOption: true })
  .option("f", { alias: "filename", describe: "File name", type: "string", demandOption: true })
  .option("o", { alias: "objname", describe: "Obj name", type: "string", demandOption: true })
  .option("s", { alias: "service", describe: "service name", type: "string", demandOption: false })
  .option("r", { alias: "route", describe: "service name", type: "string", demandOption: true })
  .option("w", { alias: "restOperation", describe: "Rest operation name", type: "string", demandOption: false })
  .option("z", { alias: "functionName", describe: "fn name", type: "string", demandOption: false })
  // .option("rfn", { alias: "routeFileName", describe: "Name of route file", type: "string", demandOption: true })
  // .option("vfn", { alias: "validatorFileName", describe: "Name of route file", type: "string", demandOption: true })
  // .option("cfn", { alias: "controllerFileName", describe: "Name of route file", type: "string", demandOption: true })
  // .option("sfn", { alias: "serviceFileName", describe: "Name of route file", type: "string", demandOption: true })
  .argv;
const { project, filename, objname, service, route, mode, restOperation, functionName } = options;
console.log(project, filename, objname, service, route, mode, restOperation)
if (mode === "create-new-component") {
  const controllerLocation = `/Users/A-10443/Documents/personal-projects/dgverse-mvp/${project}/src/controllers/${filename}.controller.js`;
  const controllerContent = `const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../utils/catchAsync');
const prisma = new PrismaClient();

const getHistory = catchAsync(async (req, res) => {
  const { tokenDetails } = req.body;
  res.status(httpStatus.OK).end();
});

module.exports = {
  getHistory,
};
`;
  const serviceLoc = `/Users/A-10443/Documents/personal-projects/dgverse-mvp/${project}/src/services/${filename}.service.js`;
  const serviceCont = `const superagent = require('superagent');
const { getServiceClient } = require('./utils/getServiceClient.js');

/**
 * Create a token
 * @param {Object} userBody
 * @returns {Object}
 */
const createToken = (token) => {
  const tokenService = getServiceClient('hedera-service');
  return new Promise((resolve, reject) => {
    superagent
      .post(\`\${tokenService}create/\`)
      .send({ token })
      .set('Accept', 'application/json')
      .end((error, res) => {
        error ? reject(error) : resolve(res);
      });
  });
};
module.exports = {
  createToken,
};
`;
  const routeLoc = `/Users/A-10443/Documents/personal-projects/dgverse-mvp/${project}/src/routes/v1/${filename}.route.js`;
  const routeCont = `const express = require('express');
const validate = require('../../middlewares/validate');
const ${objname}Controller = require('../../controllers/${filename}.controller');
const ${objname}Validation = require('../../validations/${filename}.validation');
const router = express.Router();

router.route('/history').get(validate(${objname}Validation.getHistory), ${objname}Controller.getHistory);

module.exports = router;
`;
  const validaLoc = `/Users/A-10443/Documents/personal-projects/dgverse-mvp/${project}/src/validations/${filename}.validation.js`;
  const validaCont = `const Joi = require('joi');

const getHistory = {
  body: Joi.object().keys({
    tokenDetails: Joi.object().keys({
      tokenId: Joi.string().required(),
      adminKey: Joi.string().required(),
    }),
  }),
};

module.exports = {
  getHistory,
};
`;
  const routeIndexLocation = `/Users/A-10443/Documents/personal-projects/dgverse-mvp/${project}/src/routes/v1/index.js`;
  const routeDefinition = `const ${objname}Route = require('./${filename}.route');`

  fs.writeFileSync(controllerLocation, controllerContent);
  fs.writeFileSync(routeLoc, routeCont);
  fs.writeFileSync(validaLoc, validaCont);
  if (service)
    fs.writeFileSync(serviceLoc, serviceCont);
  if (routeCont) {
    console.log('1')
    var data = fs.readFileSync(routeIndexLocation)
    fs.writeFileSync(`${routeIndexLocation}copy`, data.toString());
    var array = data.toString().split("\n");
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "const config = require('../../config/config');") {
        console.log(array[i])
        array.splice(i - 1, 0, routeDefinition);
        break;
      }

    }

    for (var i = 0; i < array.length; i++) {
      if (array[i] == "const devRoutes = [") {
        console.log(array[i])
        const lineToAdd = i;
        array.splice(lineToAdd - 2, 0, "  },");
        array.splice(lineToAdd - 2, 0, `    route: ${objname}Route,`);
        array.splice(lineToAdd - 2, 0, `    path: '/${route}',`);
        array.splice(lineToAdd - 2, 0, "  {");
        break;
      }
    }
    fs.writeFileSync(`${routeIndexLocation}`, array.join('\n'));
  }
}

if (mode === "create-new-route") {
  const projectLocation = `/Users/A-10443/Documents/personal-projects/dgverse-mvp/${project}/src/`;
  const routeLoc = `routes/v1/${filename}.route.js`;
  const routeCont = `
router.route('/${route}').${restOperation}(validate(${objname}Validation.${functionName}), ${objname}Controller.${functionName});
`;
  if (routeCont) {
    var data = fs.readFileSync(`${projectLocation}${routeLoc}`)
    // fs.writeFileSync(`${routeLoc}copy`, data.toString());
    var array = data.toString().split("\n");
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "module.exports = router;") {
        console.log(array[i])
        array.splice(i - 1, 0, routeCont);
        break;
      }

    }
    fs.writeFileSync(`${projectLocation}${routeLoc}`, array.join('\n'));
  }

  const conLoc = `controllers/${filename}.controller.js`;
  let controllerContent
  if (restOperation == 'get') {
    controllerContent = `
    const ${functionName} = catchAsync(async (req, res) => {
    const { tokenDetails } = req.body;
    res.status(httpStatus.OK).end();
    });
    `;
  } else {
    controllerContent = `
    const ${functionName} = catchAsync(async (req, res) => {
    const { tokenDetails } = req.body;
    res.status(httpStatus.OK).end();
    });
    `;
  }
  // const controllerImport = 
  if (controllerContent) {
    var data = fs.readFileSync(`${projectLocation}${conLoc}`)
    // fs.writeFileSync(`${routeLoc}copy`, data.toString());
    var array = data.toString().split("\n");
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "module.exports = {") {
        console.log(array[i])
        array.splice(i - 1, 0, controllerContent);
        break;
      }

    }
    array.splice(array.length - 2, 0, `${functionName},`);
    fs.writeFileSync(`${projectLocation}${conLoc}`, array.join('\n'));
  }

  const validatorLoc = `validations/${filename}.validation.js`;
  let validatorContent
  if (restOperation == 'get') {
    validatorContent = `
    const ${functionName} = {
      params: Joi.object().keys({
        userId: Joi.number().required(),
      }),
    };
    `;
  } else {
    validatorContent = `
    const ${functionName} = {
      params: Joi.object().keys({
        userId: Joi.number().required(),
      }),
    };
    `;
  }
  // const controllerImport = 
  if (validatorContent) {
    var data = fs.readFileSync(`${projectLocation}${validatorLoc}`)
    // fs.writeFileSync(`${routeLoc}copy`, data.toString());
    var array = data.toString().split("\n");
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "module.exports = {") {
        console.log(array[i])
        array.splice(i - 1, 0, validatorContent);
        break;
      }

    }
    array.splice(array.length - 2, 0, `${functionName},`);
    fs.writeFileSync(`${projectLocation}${validatorLoc}`, array.join('\n'));
  }
}