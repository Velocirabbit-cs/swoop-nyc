const request = require("supertest");
const Item = require("../server/models/itemModel.js");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_CONNECTION_KEY);

// const express = require("express");
// const app = express();

const server = "http://localhost:3000";

describe("Filtering Item results from the Backend", () => {
  describe("/item", () => {
    describe("GET", () => {
      const listing = {
        title: "GET Item",
        image: "testimg.com", //url from supabase
        description: "New Item Jaskon love",
        borough: "Brooklyn",
        neighborhood: "Jumanji",
      };

      beforeEach((done) => {
        Item.create(listing).then(done());
      });

      afterAll((done) => {
        Item.deleteMany({ neighborhood: "Jumanji" }).then(done());
      });

      it("responds with 200 status code and a application/json content type", () => {
        return request(server)
          .get("/item")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
      it("should return an array", () => {
        return request(server)
          .get("/item")
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toEqual(true);
          });
        // .catch((err) => {
        //   expect(err).toBeInstanceOf(Error);
        // });
      });
      it("should return an array of listing object with correct value", () => {
        return request(server)
          .get("/item")
          .then((response) => {
            // console.log(response.body);
            expect(response.status).toEqual(200);
            expect(response.body[0]).toHaveProperty("neighborhood");
            expect(response.body[0]).not.toHaveProperty("fakeProp");
          });
        // .catch((err) => {
        //   expect(err).toBeInstanceOf(Error);
        // });
      });
    });
    describe("POST", () => {
      const listing = {
        title: "POST Item",
        image: "testimg.com", //url from supabase
        description: "New Item I love",
        borough: "Brooklyn",
        neighborhood: "Zathura",
      };

      afterEach((done) => {
        Item.findOneAndDelete(listing).then(done());
      });

      const badListing = {
        title: "POST Item",
        image: "testimg.com", //url from supabase
        description: "New Item I love",
        borough: 5,
        neighborhood: "Zathura",
      };

      it("responds with 200 status code and a application/json content type", () => {
        return request(server)
          .post("/item")
          .send(listing)
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
      it("should return a listing object", () => {
        return request(server)
          .post("/item")
          .send(listing)
          .then((response) => {
            // console.log("this is post return: ", response.body);
            expect(response.status).toEqual(200);
            expect(typeof response.body).toBe("object");
            expect(response.body).toHaveProperty("neighborhood");
          });
      });
      it("responds to invalid request with 400 status and error message in body", () => {
        return request(server)
          .post("/item")
          .send(badListing)
          .catch((err) => {
            console.log(err);
            expect(response.status).toEqual(400);
            expect(err).toBeInstanceOf(Error);
          });
      });
      it("should return a response body with property 'err' if listing has wrong input value", () => {
        return request(server)
          .post("/item")
          .send(badListing)
          .then((response) => {
            console.log("res:", response.body);
            expect(response.body).toHaveProperty("err");
          });
      });
    });
  });
  describe("/item/filter", () => {
    const listing = {
      title: "GET Item",
      image: "testimg.com", //url from supabase
      description: "New Item",
      borough: "Brooklyn",
      neighborhood: "Zabumafu",
    };

    // beforeEach((done) => {
    //   Item.create({
    //     title: "GET Item",
    //     image: "testimg.com", //url from supabase
    //     description: "New Item",
    //     borough: "Brooklyn",
    //     neighborhood: "Zabumafu",
    //   }).then(done());
    // });

    afterAll((done) => {
      Item.deleteMany({ neighborhood: "Zabumafu" }).then(done());
    });

    describe("GET", () => {
      it("responds with 200 status code and a application/json content type", async () => {
        await Item.create(listing);

        return request(server)
          .get("/item/filter")
          .query({
            borough: "Brooklyn",
            neighborhood: "Zabumafu",
          })
          .then((response) => {
            console.log(response);
            expect(response.status).toEqual(200);
            // expect("Content-Type", /application\/json/);
          });
      });
      it("should return an array of listings of length 2", async () => {
        await Item.create(listing);

        return request(server)
          .get("/item/filter")
          .query({
            borough: "Brooklyn",
            neighborhood: "Zabumafu",
          })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toEqual(true);
            expect(response.body.length).toEqual(2);
          });
        // .catch((err) => {
        //   expect(err).toBeInstanceOf(Error);
        // });
      });
    });
  });
});
