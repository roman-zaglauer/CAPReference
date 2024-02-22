service CAPReferenceAPIService @(
    path    : '/api',
    requires: 'api'
) {
    // Function
    function determineLeafs(person : String) returns String;
}
