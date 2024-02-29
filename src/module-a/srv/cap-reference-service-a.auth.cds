using {CAPReferenceService as service} from './cap-reference-service-a';

annotate service with @(requires: 'authenticated-user');

annotate service.Roots with @(restrict: [
    {
        grant: ['READ'],
        to   : ['CAPReferenceViewer']
    },
    {
        grant: ['READ'],
        to   : ['CAPReferenceManager']
    },
    {
        grant: ['*'],
        to   : ['CAPReferenceAdministrator']
    }
]);

annotate service.Leafs with @(restrict: [
    {
        grant: ['READ'],
        to   : ['CAPReferenceViewer']
    },
    {
        grant: ['*'],
        to   : ['CAPReferenceManager']
    },
    {
        grant: ['*'],
        to   : ['CAPReferenceAdministrator']
    }
]);

annotate service.importRoots with @(requires: 'CAPReferenceManager');
