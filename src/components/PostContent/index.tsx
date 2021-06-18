import styles from './postContent.module.scss';

interface PostContentProps {
  content: {
    subtitle: string;
    paragraph: string[];
  }[];
}

export function PostContent({ content }: PostContentProps): JSX.Element {
  return (
    <>
      {content.map((c, contentIndex) => (
        <article
          key={`${c.subtitle}-${contentIndex + 1}`}
          className={styles.postContent}
        >
          <h2>{c.subtitle}</h2>
          {c.paragraph.map((p, paragraphIndex) => (
            <p key={`${c.subtitle}-${paragraphIndex + 2}`}>{p}</p>
          ))}
        </article>
      ))}
    </>
  );
}
