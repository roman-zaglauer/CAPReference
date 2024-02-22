using CAPReferenceService as service from '../../srv/cap-reference-service-a';

// Roots List
annotate service.Roots with @(
    Common.SemanticKey: [me_ID],
    UI                : {
        SelectionFields: [
            me_ID,
            country_code,
            statuses_code
        ],
        LineItem       : [
            {Value: me_ID},
            {Value: description},
            {
                Value      : statuses_code,
                $Type      : 'UI.DataField',
                Criticality: statuses.code
            },
            {Value: country.code},
            {Value: numberOfLeafs}
        ],
    }
);

// Roots Detail
annotate service.Roots with @(UI: {
    HeaderInfo         : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : '{i18n>roots}',
        TypeNamePlural: '{i18n>roots}',
        Title         : {Value: me_ID}
    },
    Facets             : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>partner}',
            Target: '@UI.FieldGroup#Partner'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>leafs}',
            Target: 'leafs/@UI.LineItem'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>admin}',
            Target: '@UI.FieldGroup#Admin'
        }

    ],
    FieldGroup #Partner: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {Value: me_ID},
            {
                Value      : statuses_code,
                $Type      : 'UI.DataField',
                Criticality: statuses.code
            }
        ]
    },
    FieldGroup #Admin  : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {Value: createdBy},
            {Value: createdAt},
            {Value: modifiedBy},
            {Value: modifiedAt}
        ]
    }
});

// Leafs List
annotate service.Leafs with @(
    Common.SemanticKey: [me_ID],
    UI                : {
        SelectionFields: [
            me_ID,
            validFrom,
            validTo
        ],
        LineItem       : [
            {Value: me_ID},
            {Value: description},
            {Value: validFrom},
            {Value: validTo}
        ],
    }
);

// Leafs Detail
annotate service.Leafs with @(UI: {
    HeaderInfo      : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : '{i18n>leaf}',
        TypeNamePlural: '{i18n>leafs}',
        Title         : {Value: me_ID},
        Description   : {Value: description}
    },
    Facets          : [{
        $Type : 'UI.ReferenceFacet',
        Label : '{i18n>leaf}',
        Target: '@UI.FieldGroup#leaf'
    }],
    FieldGroup #leaf: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {Value: me_ID},
            {Value: description},
            {Value: validFrom},
            {Value: validTo}
        ]
    },
});
