import { Arc, Item } from "../../api/types.ts";

const API_PREFIX = Cypress.env("API_PREFIX") as string || "/api/ardb"

describe("ARDB routes", () => {
    it("GET /items returns an array of items with expected shape", () => {
        cy.request({
            method: "GET",
            url: `${API_PREFIX}/items`,
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(`status: ${res.status}`)
            cy.log(JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("array")
            expect(res.body.length).to.be.greaterThan(0)

            const first = res.body[0] as Item

            expect(first).to.have.property("id").that.is.a("string")
            expect(first).to.have.property("name").that.is.a("string")
            expect(first).to.have.property("description").that.is.a("string")
            expect(first).to.have.property("rarity").that.is.a("string")
            expect(["common", "uncommon", "rare", "epic", "legendary"]).to.include(first.rarity)
            expect(first).to.have.property("type").that.is.a("string")
            expect(first).to.have.property("foundIn").that.is.an("array")
            expect(first).to.have.property("value").that.is.a("number")
            expect(first).to.have.property("updatedAt").that.is.a("string")
        })
    })

    it("GET /items/:id returns the matching item", () => {
        cy.request<Item[]>({
            method: "GET",
            url: `${API_PREFIX}/items`,
        }).then((listRes) => {
            cy.log(`status: ${listRes.status}`)
            cy.log(JSON.stringify(listRes.body))
            expect(listRes.status).to.eq(200)
            expect(listRes.body).to.be.an("array")
            expect(listRes.body.length).to.be.greaterThan(0)

            const { id } = listRes.body[0]
            expect(id).to.be.a("string").and.not.be.empty

            cy.request<Item>({
                method: "GET",
                url: `${API_PREFIX}/items/${encodeURIComponent(id)}`,
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("id", id)
                expect(res.body).to.have.property("name").that.is.a("string")
            })
        })
    })

    it("GET /arc returns an array of arc enemies with expected shape", () => {
        cy.request({
            method: "GET",
            url: `${API_PREFIX}/arc`,
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(`status: ${res.status}`)
            cy.log(JSON.stringify(res.body))
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
            url: `${API_PREFIX}/arc`,
        }).then((listRes) => {
            cy.log(`status: ${listRes.status}`)
            cy.log(JSON.stringify(listRes.body))
            expect(listRes.status).to.eq(200)
            expect(listRes.body).to.be.an("array")
            expect(listRes.body.length).to.be.greaterThan(0)

            const { id } = listRes.body[0]
            expect(id).to.be.a("string").and.not.be.empty

            cy.request<Arc>({
                method: "GET",
                url: `${API_PREFIX}/arc/${encodeURIComponent(id)}`,
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("id", id)
                expect(res.body).to.have.property("name").that.is.a("string")
            })
        })
    })
})
