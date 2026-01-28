import { FaGithub, FaCoffee } from "react-icons/fa"
import { aboutDescription, aboutTitle, githubLinkText, githubTitle, githubUrl, koFiLinkText, koFiTitle, koFiUrl } from "./const"

const About = () => {
    return (
        <main className="min-h-screen bg-arc-bg text-arc-text px-6 py-20">
            <div className="max-w-4xl mx-auto">
                {/* heading */}
                <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-white">
                    {aboutTitle}
                </h1>

                {/* body text */}
                <div className="mt-8 space-y-6 text-arc-muted text-lg leading-relaxed">
                    {Object.values(aboutDescription).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* divider */}
                <div className="mt-16 h-px w-full bg-arc-border" />

                {/* links */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* GitHub */}
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-lg
                            border
                            border-arc-border
                            bg-black/20
                            p-6
                            transition
                            hover:border-white/40
                            hover:bg-black/40
                        "
                    >
                        <FaGithub className="text-3xl text-white transition-transform group-hover:scale-110" />
                        <div>
                            <h2 className="text-xl font-medium text-white">
                                {githubTitle}
                            </h2>
                            <p className="text-arc-muted">
                                {githubLinkText}
                            </p>
                        </div>
                    </a>

                    {/* Ko-fi */}
                    <a
                        href={koFiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-lg
                            border
                            border-arc-border
                            bg-black/20
                            p-6
                            transition
                            hover:border-white/40
                            hover:bg-black/40
                        "
                    >
                        <FaCoffee className="text-3xl text-white transition-transform group-hover:scale-110" />
                        <div>
                            <h2 className="text-xl font-medium text-white">
                                {koFiTitle}
                            </h2>
                            <p className="text-arc-muted">
                                {koFiLinkText}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default About
