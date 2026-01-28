import React from "react"

interface CardProps {
    title?: string
    description?: string
    icon?: string
    children?: React.ReactNode
    onClick?: () => void
    href?: string
    className?: string
}

const Card = ({
    title,
    description,
    children,
    onClick,
    href,
    className
}: CardProps) => {
    const baseClasses = `
    group
    relative
    rounded-lg
    border
    border-arc-border
    bg-black/20
    p-6
    transition
    duration-300
    ease-out
    hover:border-white/40
    hover:bg-black/40
    ${className ?? ""}
  `
    console.log({ title, className })
    const content = (
        <>
            {title && (
                <h3 className={`text-xl font-medium ${className ?? "text-white"}`}>
                    {title}
                </h3>
            )}
            {description && (
                <p className="mt-2 text-arc-muted">
                    {description}
                </p>
            )}
            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </>
    )
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClasses}
            >
                {content}
            </a>
        )
    }
    return (
        <div
            onClick={onClick}
            className={`${baseClasses} ${onClick ? "cursor-pointer" : ""}`}
        >
            {content}
        </div>
    )
}

export default Card