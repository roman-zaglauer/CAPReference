/*
 Common Annotations shared by all apps
*/
using {schema} from '../db/schema';
using {cuid} from '@sap/cds/common';

// Common
annotate cuid with {
    ID @Core.Computed;
};

// Roots Elements
annotate schema.Roots with {
    ID
    @title : '{i18n>ID}'
    @UI.Hidden;
    me
    @title : '{i18n>rootsMe}';
    description
    @title : '{i18n>description}';
    statuses
    @title : '{i18n>status}'
    @Common: {
        Text           : statuses.name,
        TextArrangement: #TextOnly
    };
    country
    @title : '{i18n>country}'
    @Common: {Text: country.name};
    numberOfLeafs
    @title : '{i18n>numberOfLeafs}'
    @readonly;
};


// Leafs Elements
annotate schema.Leafs with {
    ID
    @title: '{i18n>ID}'
    @UI.Hidden;
    me
    @title: '{i18n>leafsMe}';
    validFrom
    @title: '{i18n>validFrom}';
    validTo
    @title: '{i18n>validTo}';
    description
    @title: '{i18n>description}';
};


// Status
annotate schema.Statuses with {
    code
    @Common: {Text: name};
    name
    @title : '{i18n>name}';
    descr
    @title : '{i18n>description}';
};

// Person Elements
annotate schema.Persons with {
    ID
    @Common: {Text: fullName};
    lastName
    @title : '{i18n>lastName}';
    firstName
    @title : '{i18n>firstName}';
    fullName
    @title : '{i18n>fullName}';
};
