/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
        nombre: 'Text',
        bandera:"text",
        region: "text",
        capital:["text"],
        subregion:"text",
        area:"text",
        poblacion:"number"
};


describe("Country routes", () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error("Unable to connect to the database:", err);
		})
	);
	 beforeEach(() =>
		Country.sync({ force: true }).then(() => Country.create(country))
	); 

	describe("GET /countries?name=Argentina", () => {
		it("should get 200", () =>
			agent.get("/countries?name=testname").expect(200));
	});
	describe("GET /countries/:id", () => {
		it("should get 200", () => agent.get("/countries/arg").expect(200));
	});
	describe("GET /countries/:id", () => {
		it("should get null", () => agent.get("/countries/jklj").expect(null));
	});

	describe("GET /activities", () => {
		it("should get 200", () => agent.get("/activities").expect(200));
	});
});
