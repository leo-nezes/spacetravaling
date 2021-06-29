import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { PostContent } from '../../components/PostContent';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Commentary from '../../components/Commentary';
import PreviousAndNext from '../../components/PreviousAndNext';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface DataTransfer {
  title: string;
  uid: string;
  description: string;
}

interface PostProps {
  post: Post;
  next: DataTransfer;
  previous: DataTransfer;
}

export default function Post({ post, next, previous }: PostProps): JSX.Element {
  const router = useRouter();

  const postContent = post.data.content.map(content => {
    const paragraphs = content.body.map(paragraph => paragraph.text);

    return {
      subtitle: content.heading,
      paragraph: paragraphs,
    };
  });

  const wordsQuantity = post.data.content.reduce((accumulator, c) => {
    const headingWordsQuantity = c.heading.split(' ').length;

    const bodyWordsQuantity = RichText.asText(c.body).split(' ').length;

    return accumulator + (headingWordsQuantity + bodyWordsQuantity);
  }, 0);

  const wordsPerMinutes = Math.ceil(wordsQuantity / 200);

  const formattedPublicationDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  if (router.isFallback) return <div>Carregando...</div>;

  return (
    <>
      <Head>
        <title>Post | Post Page</title>
      </Head>

      <main>
        <img
          className={styles.postBanner}
          src={post.data.banner.url}
          alt="banner"
        />
        <section
          className={`${styles.postContainer} ${commonStyles.container}`}
        >
          <header className={styles.postHeader}>
            <h1>{post.data.title}</h1>
            <address>
              <FiCalendar />
              <time>{formattedPublicationDate}</time>
              <span>
                <FiUser />
                {post.data.author}
              </span>
              <span>
                <FiClock />
                {wordsPerMinutes} min
              </span>
            </address>
          </header>

          <PostContent content={postContent} />

          <hr className={styles.divider} />

          <div className={styles.changeButtons}>
            {previous.uid && (
              <PreviousAndNext
                style={{ marginRight: 'auto', textAlign: 'left' }}
                data={previous}
              />
            )}
            {next.uid && (
              <PreviousAndNext
                style={{ marginLeft: 'auto', textAlign: 'right' }}
                data={next}
              />
            )}
          </div>

          <Commentary />
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );

  const slugs = posts.results.map(result => {
    return { params: { slug: result.uid } };
  });

  return {
    paths: [...slugs],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});
  const previousResponse = await prismic.query(
    Prismic.Predicates.dateBefore(
      'document.first_publication_date',
      response.first_publication_date
    ),
    { orderings: '[document.first_publication_date desc]', pageSize: 1 }
  );
  const nextResponse = await prismic.query(
    Prismic.Predicates.dateAfter(
      'document.first_publication_date',
      response.first_publication_date
    ),
    { orderings: '[document.first_publication_date]', pageSize: 1 }
  );

  const post = {
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
    first_publication_date: response.first_publication_date,
    uid: response.uid,
  };

  const previous = {
    uid: previousResponse.results[0] ? previousResponse.results[0].uid : null,
    title: previousResponse.results[0]
      ? previousResponse.results[0].data.title
      : null,
    description: 'Post anterior',
  };
  const next = {
    uid: nextResponse.results[0] ? nextResponse.results[0].uid : null,
    title: nextResponse.results[0] ? nextResponse.results[0].data.title : null,
    description: 'Próximo post',
  };

  return {
    props: {
      post,
      previous,
      next,
    },
    revalidate: 60 * 30, // 1min * 30 = 30min
  };
};
