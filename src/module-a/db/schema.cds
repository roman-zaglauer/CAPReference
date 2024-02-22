using {
    cuid,
    managed,
    sap.common.CodeList,
    Country,
} from '@sap/cds/common';

using {API_BUSINESS_PARTNER as BusinessPartnerService} from '../srv/external/API_BUSINESS_PARTNER';

namespace schema;

@singular: 'Root'
@plural  : 'Roots'
entity Roots : cuid, managed {
    me                    : Association to Persons;
    description           : String;
    statuses              : Association to Statuses;
    country               : Country;
    virtual numberOfLeafs : Integer;
    leafs                 : Composition of many Leafs
                                on leafs.roots = $self;
};

@singular: 'Leaf'
@plural  : 'Leafs'
entity Leafs : cuid, managed {
    me          : Association to Persons;
    description : String;
    validFrom   : Date;
    validTo     : Date;
    roots       : Association to Roots;
};

@singular: 'Status'
@plural  : 'Statuses'
entity Statuses : CodeList {
    key code : Integer;
};

@Singular: 'Person'
@plural  : 'Persons'
entity Persons as
    projection on BusinessPartnerService.A_BusinessPartner {
        key BusinessPartner         as ID,
            LastName                as lastName,
            FirstName               as firstName,
            BusinessPartnerFullName as fullName
    };
