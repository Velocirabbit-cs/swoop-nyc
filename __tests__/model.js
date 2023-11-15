// const request = require("supertest");
const itemModel = require("../server/models/itemModel");
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
require('dotenv').config()
mongoose.connect(process.env.DATABASE_CONNECTION_KEY)
// const supabaseUrl = 'https://bmvohouexqmijckbooug.supabase.co'
// const supabaseKey = process.env.REACT_APP_SUPABASE


describe("model unit tests", () => {

    afterEach((done) => {
        itemModel.findOneAndDelete({neighborhood: "Test neighborhood"}).then();
        itemModel.findOneAndDelete({neighborhood: 0}).then();
        itemModel.findOneAndDelete({borough: 0}).then(done());
    });

    describe(".create()", () => {
        it("checks if object is being added to mongo Atlas", async() => {       
            const insertedItem = await itemModel.create({
                title: "Testing Chair",
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            });

            const goodFakeModel = {
                title: "Testing Chair",
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            }

            const badFakeModel = {
                title: "Testing Sofa",
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            }


            expect(insertedItem).toMatchObject(goodFakeModel)
            expect(insertedItem).not.toMatchObject(badFakeModel)
        });

        it("checks if models with invalid types are being uploaded", async() => {

            const insertedItem1 = await itemModel.create({
                title: 0,
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            });

            const fakeModel1 = {
                title: 0,
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            }

            const insertedItem2 = await itemModel.create({
                title: "Here",
                image: "Test src",
                description: 0,
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            });

            const fakeModel2 = {
                title: "Here",
                image: "Test src",
                description: 0,
                borough: "The real Bikini Bottom",
                neighborhood: "Test neighborhood",
            }

            const insertedItem3 = await itemModel.create({
                title: "Here",
                image: "Test src",
                description: "Test description",
                borough: 0,
                neighborhood: "Test neighborhood",
            });

            const fakeModel3 = {
                title: "Here",
                image: "Test src",
                description: "Test description",
                borough: 0,
                neighborhood: "Test neighborhood",
            }

            const insertedItem4 = await itemModel.create({
                title: "Here",
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: 0,
            });

            const fakeModel4 = {
                title: "Here",
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom",
                neighborhood: 0,
            }

            expect(insertedItem1).not.toMatchObject(fakeModel1)
            expect(insertedItem2).not.toMatchObject(fakeModel2)
            expect(insertedItem3).not.toMatchObject(fakeModel3)
            expect(insertedItem4).not.toMatchObject(fakeModel4)
        });
    });

    describe(".find()", () => {

        beforeEach( async() => {
             const newItem = await itemModel.create({
                title: "Testing Chair22",
                image: "Test src",
                description: "Test description",
                borough: "The real Bikini Bottom22",
                neighborhood: "Test neighborhood",
            });
          });

        afterEach((done) => {
            itemModel.findOneAndDelete({borough: "The real Bikini Bottom22"}).then(done());
        });

        it("checks if object exists in monog Atlas", async() => {

            const foundItem = await itemModel.find({
                title: "Testing Chair22"
            });

            expect(foundItem[0].borough).toEqual('The real Bikini Bottom22')
            expect(foundItem[0].borough).not.toEqual("The real Bikini Bottom")
        });
    });
});