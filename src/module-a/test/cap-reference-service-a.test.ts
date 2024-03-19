import cds from "@sap/cds";
import { HttpStatusCode, isAxiosError } from "axios";
import { Leaf, Root } from "#cds-models/CAPReferenceService";

const { POST, PATCH, DELETE, GET, expect, axios } = cds.test(__dirname + "/..");
axios.defaults.auth = { username: "alice", password: "" };

describe("Service Health Check", () => {
  it("should check if the $metadata document is served as V4", async () => {
    const { headers, data, status } = await GET("service/$metadata");
    expect(headers).to.contain({
      "content-type": "application/xml",
      "odata-version": "4.0",
    });
    expect(data).to.contain(
      '<EntitySet Name="Roots" EntityType="CAPReferenceService.Roots">',
    );
    expect(data).to.contain(
      '<EntitySet Name="Leafs" EntityType="CAPReferenceService.Leafs">',
    );
    expect(data).to.contain(
      '<EntitySet Name="Persons" EntityType="CAPReferenceService.Persons"/>',
    );
    expect(data).to.contain(
      '<EntitySet Name="Statuses" EntityType="CAPReferenceService.Statuses">',
    );
    expect(data).to.contain(
      '<EntitySet Name="Countries" EntityType="CAPReferenceService.Countries">',
    );
    expect(data).to.contain(
      '<EntitySet Name="Statuses_texts" EntityType="CAPReferenceService.Statuses_texts"/>',
    );
    expect(data).to.contain(
      '<EntitySet Name="Countries_texts" EntityType="CAPReferenceService.Countries_texts"/>',
    );
    expect(status).to.equal(HttpStatusCode.Ok);
  });

  describe("Service Entity Root - CRUD", () => {
    it("should create a new entity", async () => {
      const { data, status } = await POST("service/Roots", {
        description: "Test",
        statuses_code: 3,
        country_code: "DE"
      } as Root);
      expect(data).to.be.an("object");
      expect(data).to.have.property("description");
      expect((data as Root).createdBy).to.equal("alice");
      expect(status).to.equal(HttpStatusCode.Created);
    });

    it("should retrieve a specific entity", async () => {
      const res = await POST("service/Roots", {});

      const { data, status } = await GET(
        `service/Roots(ID=${(res.data as Root).ID},IsActiveEntity=false)`
      );
      expect(data).to.be.an("object");
      expect(data).to.have.property("description");
      expect((data as Root).ID).to.equal((res.data as Root).ID);
      expect(status).to.equal(HttpStatusCode.Ok);
    });

    it("should update an entity", async () => {
        const res = await POST("service/Roots", {});
  
        const { data, status } = await PATCH(
          `service/Roots(ID=${(res.data as Root).ID},IsActiveEntity=false)`, {
            country_code: "FR"
          } as Root);
        expect(data).to.be.an("object");
        expect(data).to.have.property("description");
        expect((data as Root).country_code).to.equal("FR");
        expect(status).to.equal(HttpStatusCode.Ok);
      });

      it("should delete an entity", async () => {
        const res = await POST("service/Roots", {});
  
        const { status } = await DELETE(
          `service/Roots(ID=${(res.data as Root).ID},IsActiveEntity=false)`);
        expect(status).to.equal(HttpStatusCode.NoContent);


        try {
            await GET(
                `service/Roots(ID=${(res.data as Root).ID},IsActiveEntity=false)`
              );
        } catch (error) {
            if(isAxiosError(error)) {
                expect(error.response.status).to.equal(HttpStatusCode.NotFound);
            } else {
                throw error;
            }
        }

     
      });
  });

});
