export type Arc = {
    id: string
    name: string
    updatedAt: string | Date
    icon: string
}

export type ArcEvent = {
    name: EventName
    map: MapName
    icon: string
    startTime: number
    endTime: number
}

export type EventName =
    | 'Night Raid'
    | 'Harvester'
    | 'Uncovered Caches'
    | 'Locked Gate'
    | 'Electromagnetic Storm'
    | 'Husk Graveyard'
    | 'Matriarch'
    | 'Launch Tower Loot'
    | 'Hidden Bunker'
    | 'Prospecting Probes'
    | 'Lush Blooms'

export type EventsResponse = {
    data: ArcEvent[]
    cachedAt: number
}

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

export type ItemType =
    | 'Quick Use'
    | 'Recyclable'
    | 'Topside Material'
    | 'Basic Material'
    | 'Augment'
    | 'Shield'
    | 'Gadget'
    | 'Key'
    | 'Modification'
    | 'Weapon'
    | 'Ammunition'

export type MapData = MapDataPoint[]

export type MapDataPoint = {
    id: string
    lat: number
    lng: number
    zlayers: number
    mapID: string
    category: string
    subcategory: string
    instanceName: string
    added_by: string
    behindLockedDoor: boolean
    last_edited_by: string
    updated_at: string
    eventConditionMask: number
    lootAreas: string[] | null
}
export type MapName =
    | 'Spaceport'
    | 'Blue Gate'
    | 'Buried City'
    | 'Dam'
    | 'Stella Montis'

export type Quest = {
    id: string
    title: string
    description: string
    maps: QuestMap[]
    steps: QuestStep[]
    trader: Trader
    requiredItems: string[]
    xpReward: number
    updatedAt: string
}

//may change if we have a more detailed quest map structure
export type QuestMap = {
    id: string
    name: string
}

export type QuestStep = {
    title: string
    amount?: number
}

export type Rarity =
    | 'Common'
    | 'Uncommon'
    | 'Rare'
    | 'Epic'
    | 'Legendary'

export type Trader = {
    id: string
    name: string
    type: string
    description: string
    image: string
    icon: string
}

export type TraderCatalogResponse = {
    data: Record<string, TraderItem[]>
}

export type TraderItem = {
    id: string
    icon: string
    name: string
    value: number
    rarity: Rarity
    item_type: ItemType
    description: string
    trader_price: number
}
