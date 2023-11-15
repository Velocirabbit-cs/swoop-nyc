const request = require("supertest");

const server = "http://localhost:3000";

describe("Filtering Item results from the Backend", () => {
  describe("/all-listings", () => {
    describe("GET", () => {
      it("should return an array of most recent listings of size (20)", () => {});
      xit("should return most recent listings up to quantity indicated by params", () => {});
      it("responds with 200 status code and a application/json content type", () => {});
      it("", () => {});
    });
  });
});
