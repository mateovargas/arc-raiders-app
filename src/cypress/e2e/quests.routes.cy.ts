import { Quest } from "../../src/api/types.ts"
import { ARDB_API_PREFIX } from "./const.ts"

describe("ARDB quest routes", () => {
    it("GET /quests returns an array of quests with expected shape", () => {
        cy.request({
            method: "GET",
            url: `${ARDB_API_PREFIX}/quests`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("array")
            expect(res.body.length).to.be.greaterThan(0)

            const first = res.body[0] as Quest
            expect(first).to.have.property("id").that.is.a("string")
            expect(first).to.have.property("title").that.is.a("string")
        })
    })

    it("GET /quests/:id returns the matching quest", () => {
        cy.request<Quest[]>({
            method: "GET",
            url: `${ARDB_API_PREFIX}/quests`,
        }).then((listRes) => {
            expect(listRes.status).to.eq(200)
            expect(listRes.body).to.be.an("array")
            expect(listRes.body.length).to.be.greaterThan(0)

            const { id } = listRes.body[0]
            expect(id).to.be.a("string").and.not.be.empty

            cy.request({
                method: "GET",
                url: `${ARDB_API_PREFIX}/quests/${encodeURIComponent(id)}`,
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("id", id)
                expect(res.body).to.have.property("title").that.is.a("string")
            })
        })
    })
})