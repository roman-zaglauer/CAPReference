using {schema} from '../db/schema';

service CAPReferenceService @(path: '/service') {

    // Roots
    @(Capabilities: {
        InsertRestrictions.Insertable: true,
        ReadRestrictions.Readable    : true,
        UpdateRestrictions.Updatable : true,
        DeleteRestrictions.Deletable : true
    })
    entity Roots   as projection on schema.Roots actions {
                          @(requires: 'CAPReferenceAdministrator', // typer does not find the action in the auth file
                          )
                          action findLeafs(roots : $self, simulation : Boolean  @Common.Label:'Simulation'  @UI.ParameterDefaultValue:true  );
                      };

    annotate Roots with @odata.draft.enabled;
    // Leafs
    entity Leafs   as projection on schema.Leafs;

    // Person
    @readonly
    entity Persons as projection on schema.Persons;

    annotate Persons with @Capabilities.SearchRestrictions.Searchable: false;
    // Actions
    action importRoots();

    annotate importRoots with @(
        Core.OperationAvailable          : true,
        Common.SideEffects.TargetEntities: ['/CAPReferenceService.EntityContainer/Roots']
    );
}
