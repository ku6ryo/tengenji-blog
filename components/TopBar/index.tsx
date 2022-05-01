import style from "./index.module.scss";
import Link from "next/link"

export function TopBar () {
  return (
    <Link href="/" passHref>
      <div className={style.blog_title}>Tengenji Tech Blog</div>
    </Link>
  )
}
