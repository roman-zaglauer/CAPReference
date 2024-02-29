using {schema} from '../db/schema';

service CAPReferenceAPIService @(
    path    : '/api',
    requires: 'api'
) {
    // Leafs
    entity Leafs as projection on schema.Leafs;
    // Function
    function determineLeafs(ID : UUID) returns Leafs;
}
