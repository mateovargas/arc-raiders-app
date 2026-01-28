import { NavLink } from "react-router-dom";

type HeaderLinkProps = {
    to: string;
    className?: string;
    children: React.ReactNode;
};

export default function HeaderLink({ to, className = "", children }: HeaderLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "text-lg transition-colors",
                    className,
                    isActive ? "font-semibold" : "",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}

