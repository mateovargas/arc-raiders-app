export type Item = {
    id: string
    name: string
    description: string
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
    type: string
    foundIn: string[]
    value: number
    updatedAt: string
}