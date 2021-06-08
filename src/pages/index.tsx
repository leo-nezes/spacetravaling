import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={styles.homeContainer}>
        <section className={styles.homeContent}>
          <h1>Como utilizar Hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
            <FiCalendar />
            <time>15 Abr 2021</time>
            <span>
              <FiUser /> Leonardo Menezes
            </span>
          </div>
        </section>
        <section className={styles.homeContent}>
          <h1>Como utilizar Hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
            <FiCalendar />
            <time>15 Abr 2021</time>
            <span>
              <FiUser /> Leonardo Menezes
            </span>
          </div>
        </section>
        <section className={styles.homeContent}>
          <h1>Como utilizar Hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
            <FiCalendar />
            <time>15 Abr 2021</time>
            <span>
              <FiUser /> Leonardo Menezes
            </span>
          </div>
        </section>
        <section className={styles.homeContent}>
          <h1>Como utilizar Hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
            <FiCalendar />
            <time>15 Abr 2021</time>
            <span>
              <FiUser /> Leonardo Menezes
            </span>
          </div>
        </section>
        <section className={styles.homeContent}>
          <h1>Como utilizar Hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
            <FiCalendar />
            <time>15 Abr 2021</time>
            <span>
              <FiUser /> Leonardo Menezes
            </span>
          </div>
        </section>

        <button className={styles.loadButton} type="button">
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
