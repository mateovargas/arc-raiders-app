import { Arc } from "../../src/api/types.ts"
import { ARDB_API_PREFIX } from "./const.ts"

describe("ARDB arc routes", () => {
    it("GET /arc returns an array of arc enemies with expected shape", () => {
        cy.request({
            method: "GET",
            url: `${ARDB_API_PREFIX}/arc`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("array")
            expect(res.body.length).to.be.greaterThan(0)

            const first = res.body[0] as Arc
            expect(first).to.have.property("id").that.is.a("string")
            expect(first).to.have.property("name").that.is.a("string")
            expect(first).to.have.property("icon").that.is.a("string")
            expect(first).to.have.property("updatedAt")
        })
    })

    it("GET /arc/:id returns the matching arc enemy", () => {
        cy.request<Arc[]>({
            method: "GET",
            url: `${ARDB_API_PREFIX}/arc`,
        }).then((listRes) => {
            expect(listRes.status).to.eq(200)
            expect(listRes.body).to.be.an("array")
            expect(listRes.body.length).to.be.greaterThan(0)

            const { id } = listRes.body[0]
            expect(id).to.be.a("string").and.not.be.empty

            cy.request<Arc>({
                method: "GET",
                url: `${ARDB_API_PREFIX}/arc/${encodeURIComponent(id)}`,
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("id", id)
                expect(res.body).to.have.property("name").that.is.a("string")
            })
        })
    })
})