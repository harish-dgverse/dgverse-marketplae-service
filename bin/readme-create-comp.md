# Overview
Command line interface to be used with dgverse repos. Will help in 
- Creating new validator, controller, route for file for new components. Will add the boilerplate code too, along with a working route
- Create new route in existing route file, along with new functions in controllers and validators

## Options

### General required params

-p, --project: Project/Repo
-m, --mode: create-new-component
### Create new components and helper
Creates new components
- Route file, added route and import to index file and creates a back file
- Validation js file
- Controller js file
- Optionally creates a service js file

Eg: ./bin/index.js -m create-new-component -p mint-nft -f hederaServices -o hederaServices -s false -r hts
Required params: 
 -f, --filename: Filename to be kept for files to be created. Will be appended controller.js, service.js (if opted), route.js, validation.js. For eg: 
 -o, --objname: Name to be kept for the object.
 -s, --service
 -r, --route

 ### Create new route and helpers
 Create a new routes and create the following fucntions
 - Adds route and import to index file and creates a back file
- Validation js fn
- Controller js fn
- Optionally creates a service fn

Eg: ./bin/index.js -m create-new-route -p mint-nft -f user -o user -r /notification/:ntfcnId -w patch -z updateReadFlagNotifications
Required params: 
 -f, --filename: Filename to be kept for files to be created. Will be appended controller.js, service.js (if opted), route.js, validation.js. For eg: 
 -o, --objname: Name to be kept for the object.
 -s, --service
 -r, --route
 -z : Functin name for controller nd validaotr
 -w : rest operation