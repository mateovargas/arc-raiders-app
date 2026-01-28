import HeaderLink from "./HeaderLink"

const Header = () => {
    return (
        <header className="w-full border-b border-arc-border">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-14 items-center justify-between">
                    {/* Left */}
                    <HeaderLink
                        to="/"
                        className="text-lg font-semibold tracking-wide text-arc-text"
                    >
                        Speranza DB
                    </HeaderLink>

                    {/* Center */}
                    <nav className="flex gap-6">
                        <HeaderLink to="/arc" className="text-arc-cyan hover:opacity-90">
                            Arc
                        </HeaderLink>
                        <HeaderLink to="/events" className="text-arc-green hover:opacity-90">
                            Events
                        </HeaderLink>
                        <HeaderLink to="/items" className="text-arc-yellow hover:opacity-90">
                            Items
                        </HeaderLink>
                        <HeaderLink to="/quests" className="text-arc-red hover:opacity-90">
                            Quests
                        </HeaderLink>
                        <HeaderLink to="/traders" className="text-white hover:opacity-90">
                            Traders
                        </HeaderLink>
                    </nav>

                    {/* Right */}
                    <HeaderLink
                        to="/about"
                        className="text-arc-text hover:opacity-90"
                    >
                        About
                    </HeaderLink>
                </div>
            </div>
        </header>
    )
}

export default Header
