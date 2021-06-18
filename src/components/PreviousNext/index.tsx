import Link from 'next/link';

import styles from './previousNext.module.scss';

interface PreviousNextProps {
  data: {
    title: string;
    description: string;
    uid: string;
  };
}

export default function PreviousNext({ data }: PreviousNextProps): JSX.Element {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{data.title}</span>
      <Link href={`/post/${data.uid}`}>
        <a className={styles.description}>{data.description}</a>
      </Link>
    </div>
  );
}
