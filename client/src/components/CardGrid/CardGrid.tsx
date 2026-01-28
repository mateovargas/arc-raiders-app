import Card from '../Card/Card'
import { columnTextColors } from './const'
import type { CardGridProps } from './types';

const CardGrid = ({ heading, items }: CardGridProps) => {
    console.log({ items });
    return (
        <main className="min-h-screen bg-arc-bg text-arc-text px-6 py-20">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-white text-center">
                    {heading}
                </h1>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => {
                        const colorClass =
                            columnTextColors[index % columnTextColors.length]
                        return (
                            <Card
                                key={item.id}
                                title={item.name}
                                description={item.description}
                                className={colorClass}
                                href={item.href}
                                onClick={item.onClick/**want to add a click that opens up the card */}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default CardGrid
