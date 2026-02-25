import { ARTICLES, getArticlePageBySlug } from '../index';
import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function getArticleSlugs() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const articlePage = await getArticlePageBySlug(slug);

  if (!articlePage) {
    notFound();
  }

  const { article, title, Content } = articlePage;

  return (
    <ArticleClient article={article} title={title}>
      <Content />
    </ArticleClient>
  );
}
