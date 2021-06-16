import styles from './postContent.module.scss';

interface PostContentProps {
  content: {
    subtitle: string;
    paragraph: string[];
  }[];
}

export function PostContent({ content }: PostContentProps): JSX.Element {
  return (
    <article className={styles.postContent}>
      {content.map(c => (
        <>
          <h2 key={c.subtitle}>{c.subtitle}</h2>
          {c.paragraph.map(p => (
            <p key={c.subtitle}>{p}</p>
          ))}
        </>
      ))}
    </article>
  );
}
