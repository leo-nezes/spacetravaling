import Link from 'next/link';

import styles from './leavePreview.module.scss';

interface LeavePreviewModeProps {
  style?: Record<string, string>;
}

export function LeavePreviewMode({
  style,
}: LeavePreviewModeProps): JSX.Element {
  return (
    <Link href="/api/exit-preview">
      <a className={styles.container} style={style}>
        <span>Sair do modo Preview</span>
      </a>
    </Link>
  );
}
