export interface CardItem {
    id: string
    title?: string,
    name?: string
    description?: string,
    icon?: string,
    href?: string
    onClick?: () => void
}

export interface CardGridProps {
    heading: string
    items: CardItem[]
}
