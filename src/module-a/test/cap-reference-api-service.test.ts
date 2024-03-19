// import cds from "@sap/cds";
// import { AxiosInstance } from "axios";

// const cdsTest = cds.test("serve", "APIService", "--in-memory", "--with-mocks");

// describe(() => { const test = cds.test(__dirname+'/..')});

import cds from "@sap/cds";

const { GET, expect, axios } = cds.test(__dirname + "/..");
axios.defaults.auth = { username: "alice", password: "" };

describe("Service Health Check", () => {
  it("should check if the $metadata document is served as V4", async () => {
    const { headers, data, status } = await GET("api/$metadata");
    console.log(headers);
    expect(headers).to.contain({
      "content-type": "application/xml",
      "odata-version": "4.0",
    });
    expect(data).to.contain(
      '<EntitySet Name="Leafs" EntityType="CAPReferenceAPIService.Leafs"/>',
    );
    expect(data).to.contain(
      '<FunctionImport Name="determineLeafs" Function="CAPReferenceAPIService.determineLeafs" EntitySet="Leafs"/>',
    );
    expect(status).to.equal(200);
  });
});
