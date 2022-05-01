import { PrismicDocument } from '@prismicio/types';
import style from "./index.module.scss";
import Link from "next/link";
import Image from "next/image"
import dateFormat from "dateformat"

type Props = {
  docs: PrismicDocument[]
}

export function ArticleList ({ docs }: Props) {

  return (
    <div className={style.list}>
      {docs.map((doc) => {
        return (
          <Link href={`/blog/${doc.uid}`} key={doc.uid} passHref>
            <div className={style.item}>
              <div className={style.image}>
                <Image
                  src={doc.data.header_image.url}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={style.text}>
                <div className={style.title}>{doc.data.title}</div>
                <div className={style.date}>{dateFormat(doc.first_publication_date, "mmmm dS yyyy")}</div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}