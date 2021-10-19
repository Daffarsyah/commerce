import s from './MenuNavigation.module.scss'
import MenuNavigationItem from './MenuNavigationItem/MenuNavigationItem'

interface Props {
    children?: any,
    heading: string,
    queryKey: string,
    categories: { name: string, slug?: string, code?: string }[]
    isSingleSelect?: boolean
}

const MenuNavigation = ({ heading, queryKey, categories, isSingleSelect }: Props) => {
    return (
        <section className={s.menuNavigationWrapper}>
            <h2 className={s.menuNavigationHeading}>{heading}({categories.length})</h2>
            <ul className={s.menuNavigationList}>
                {
                    categories.map(item => <MenuNavigationItem
                        key={item.name}
                        name={item.name}
                        value={item.slug || item.code || ''}
                        queryKey={queryKey}
                        isSingleSelect={isSingleSelect}
                    />)
                }
            </ul>
        </section>
    )
}

export default MenuNavigation