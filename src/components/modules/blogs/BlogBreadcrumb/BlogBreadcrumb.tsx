import { BreadcrumbCommon } from "src/components/common"
import s from './BlogBreadCrumb.module.scss'

const BLOG_DATA = [
    {link: "/", name: "Home"},
    {link: "/blogs", name: "Blog"},
];

const BlogBreadCrumb = () => {
    return (
        <section className={s.breadCrumbWrapper}>
            <BreadcrumbCommon crumbs={BLOG_DATA} showHomePage={true}/>
        </section>
    )
}

export default BlogBreadCrumb