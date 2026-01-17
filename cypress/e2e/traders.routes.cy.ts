import type { TraderCatalogResponse, TraderItem } from "../../api/types.ts"
import { MF_API_PREFIX } from "./const.ts"

function firstTraderKey(traders: TraderCatalogResponse): string | undefined {
    const data = traders?.data as Record<string, unknown> | undefined
    if (!data || typeof data !== "object") return undefined
    return Object.keys(data)[0]
}

describe("Metaforge trader routes", () => {
    it("GET /traders returns trader catalog with expected shape", () => {
        cy.request<TraderCatalogResponse>({
            method: "GET",
            url: `${MF_API_PREFIX}/traders`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("data")

            const key = firstTraderKey(res.body)
            expect(key, "first trader key").to.be.a("string").and.not.be.empty

            const firstList = (res.body.data as Record<string, TraderItem[]>)[key as string]
            expect(firstList, "first trader list").to.be.an("array")
        })
    })

    it("GET /traders/:name returns the matching trader array", () => {
        cy.request<TraderCatalogResponse>({
            method: "GET",
            url: `${MF_API_PREFIX}/traders`,
            failOnStatusCode: false,
        }).then((listRes) => {
            expect(listRes.status).to.eq(200)

            const key = firstTraderKey(listRes.body)
            expect(key, "trader key").to.be.a("string").and.not.be.empty

            cy.request<TraderItem[]>({
                method: "GET",
                url: `${MF_API_PREFIX}/traders/${encodeURIComponent(key as string)}`,
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
})
