import type { ArcEvent, EventsResponse } from "../../src/api/types.js"

const API_PREFIX = (Cypress.env("METAFORGE_PREFIX") as string) || "/api/metaforge"

describe("Metaforge events routes", () => {
    it("GET /events-schedule returns events schedule with expected shape", () => {
        cy.request<EventsResponse>({
            method: "GET",
            url: `${API_PREFIX}/events-schedule`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)

            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("data")
            expect(res.body.data).to.be.an("array")
            expect(res.body.data.length).to.be.greaterThan(0)

            const first = res.body.data[0] as ArcEvent
            expect(first).to.have.property("name").that.is.a("string")
        })
    })

    it("GET /events-schedule/:name returns the matching event using night-raid", () => {
        cy.request<ArcEvent>({
            method: "GET",
            url: `${API_PREFIX}/events-schedule/${encodeURIComponent("night-raid")}`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("name").that.is.a("string")

            const normalized = String(res.body.name).trim().toLowerCase()
            expect(normalized).to.eq("night raid")
        })
    })
})
