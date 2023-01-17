/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
        nombre: 'Argentina',
        bandera:"text",
        region: "Americas",
        capital:"Buenos Aires",
        subregion:"America del sur",
        area:"text",
        poblacion:45123,
		id:"ARG"
};


describe("Country routes", () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error("Unable to connect to the database:", err);
		})
	);
	 before(() =>
		Country.sync({ force: true }).then(() => Country.create(country))
	); 
	describe("GET /countries", () => {
		it("should get 200", () => agent.get("/countries").expect(200));
	});
	describe("GET /countries/:id", () => {
		it("should get 404", () => agent.get("/countries/jklj").expect(404));
	});

	describe("GET /activities", () => {
		it("should get 200", () => agent.get("/activities").expect(200));
	});
});
