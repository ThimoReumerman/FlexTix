export type NavigationItems = {
    href?: string,
    title: string
}

export type NavBarProps = {
    items: NavigationItems[];
}

const NavBar: React.FC<NavBarProps> = ({items}: NavBarProps) => {
    return(
        <nav>
            <ul>
                {items.map(item => (
                    <li key={item.title}>
                        {item.href ? <a href={item.href}>{item.title}</a> : <div>{item.title}</div>}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar;