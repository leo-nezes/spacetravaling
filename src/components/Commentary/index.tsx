import { useEffect } from 'react';

import styles from './commentary.module.scss';

export function Commentary(): JSX.Element {
  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('repo', 'leo-nezes/spacetraveling');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', 'github-dark');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    anchor.appendChild(script);
  }, []);

  return (
    <div className={styles.container} id="inject-comments-for-uterances" />
  );
}
