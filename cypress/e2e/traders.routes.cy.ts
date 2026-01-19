import type { TraderCatalogResponse, TraderItem } from "../../src/api/types.ts"

const API_PREFIX = (Cypress.env("METAFORGE_PREFIX") as string) || "/api/metaforge"

describe("Metaforge trader routes", () => {
    it("GET /traders returns trader catalog with expected shape", () => {
        cy.request<TraderCatalogResponse>({
            method: "GET",
            url: `${API_PREFIX}/traders`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("data")
            expect(res.body.data).to.be.an("object")
        })
    })

    it("GET /traders/:name returns the matching trader array using Apollo", () => {
        cy.request<TraderItem[]>({
            method: "GET",
            url: `${API_PREFIX}/traders/${encodeURIComponent("Apollo")}`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("array")

            if (res.body.length > 0) {
                const first = res.body[0] as TraderItem
                expect(first).to.be.an("object")
            }
        })
    })
})