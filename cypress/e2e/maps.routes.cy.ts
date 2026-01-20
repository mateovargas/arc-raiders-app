// cypress/e2e/maps.routes.cy.ts
import type { MapData, MapDataPoint } from "../../src/api/types.ts"
import { MF_API_PREFIX } from "./const.ts"

describe("Metaforge map routes", () => {
    it("GET /maps/:name returns { allData } where allData is MapDataPoints[] for dam", () => {
        cy.request({
            method: "GET",
            url: `${MF_API_PREFIX}/maps/${encodeURIComponent("dam")}`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)

            const xcache = res.headers["xcache"] || res.headers["XCache"]
            expect(String(xcache)).to.match(/HIT|MISS/)

            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("allData")

            const allData: MapData = res.body.allData
            expect(allData).to.be.an("array")
            expect(allData.length).to.be.greaterThan(0)

            const first: MapDataPoint = allData[0]
            expect(first).to.be.an("object")

            expect(first).to.have.property("id").that.is.a("string")
            expect(first).to.have.property("mapID").that.is.a("string")

            expect(first).to.have.property("category").that.is.a("string")
            expect(first).to.have.property("subcategory").that.is.a("string")
            expect(first).to.have.property("lat").that.is.a("number")
            expect(first).to.have.property("lng").that.is.a("number")
        })
    })
})