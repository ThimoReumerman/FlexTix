export type NavigationItems = {
    href: string,
    title: string
}

export type NavBarProps = {
    items: NavigationItems[];
}

const NavBar: React.FC<NavBarProps> = ({items}: NavBarProps) => {
    return(
        <nav>
            {items.map(item => (
                <a href={item.href}>{item.title}</a>
            ))}
        </nav>
    )
}

export default NavBar;