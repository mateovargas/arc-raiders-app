import type { ArcEvent, EventsResponse } from "../../src/api/types.ts"
import { MF_API_PREFIX } from "./const.ts"

describe("Metaforge events routes", () => {
    it("GET /events-schedule returns events schedule with expected shape", () => {
        cy.request<EventsResponse>({
            method: "GET",
            url: `${MF_API_PREFIX}/events-schedule`,
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

    it("GET /events-schedule/:name returns the matching event", () => {
        cy.request<EventsResponse>({
            method: "GET",
            url: `${MF_API_PREFIX}/events-schedule`,
            failOnStatusCode: false,
        }).then((listRes) => {
            expect(listRes.status).to.eq(200)
            expect(listRes.body.data).to.be.an("array")
            expect(listRes.body.data.length).to.be.greaterThan(0)

            const first = listRes.body.data[0] as ArcEvent
            expect(first).to.have.property("name").that.is.a("string").and.not.be.empty

            // your route does req.params.name.replace("-", " ")
            // so this mirrors that behavior (only first space becomes a hyphen)
            const nameParam = first.name.replace(" ", "-")

            cy.request<ArcEvent>({
                method: "GET",
                url: `${MF_API_PREFIX}/events-schedule/${encodeURIComponent(nameParam)}`,
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("name")
                expect(res.body.name.toLowerCase()).to.eq(first.name.toLowerCase())
            })
        })
    })
})
