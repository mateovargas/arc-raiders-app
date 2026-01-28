import { HeroSubtitle, HeroTitle } from "./const"

const Hero = () => {
    return (
        <section className="
            relative
            flex
            items-center
            justify-center
            min-h-[70vh]
            bg-arc-bg
            text-arc-text
            overflow-hidden
            transition-transform
            duration-300
            ease-out
            hover:scale-[1.01]
            "
        >
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />

            <div className="relative z-10 max-w-4xl px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    {HeroTitle}
                </h1>
                <div className="mt-6 mx-auto w-24 h-px bg-arc-border" />
                <p className="mt-6 text-lg md:text-xl text-arc-muted">
                    {HeroSubtitle}
                </p>
            </div>
        </section>
    )
}

export default Hero