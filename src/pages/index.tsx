import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

export default function Home({
  next_page,
  results,
}: PostPagination): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={`${styles.homeContainer} ${commonStyles.container}`}>
        {results.map(post => (
          <section className={styles.homeContent}>
            <Link href={`/post/${post.uid}`}>
              <a>{post.data.title}</a>
            </Link>
            <p>{post.data.subtitle}</p>
            <div>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
              <span>
                <FiUser /> {post.data.author}
              </span>
            </div>
          </section>
        ))}

        {next_page && (
          <button className={styles.loadButton} type="button">
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );

  const { next_page } = postsResponse;

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy - HH:mm',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      results: posts,
      next_page,
    },
  };
};
