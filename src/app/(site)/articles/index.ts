import type { ComponentType } from 'react';

/*=================================================
 * "The mind of the subject will desperately
 * struggle to create memories where none exist..."
 *
 * Barriers to Trans-Dimensional Travel
 * - R. Lutece (Bioshock Infinite)
 *=================================================*/

type ISODateString = string;
type ArticleMdxContent = { default: ComponentType; title?: string };
type ArticleLoader = () => Promise<ArticleMdxContent>;

export type ArticleMeta = {
	slug: string;
	tag: string;
	date: ISODateString;
	excerpt: string;
};

export type ArticleListItem = ArticleMeta & {
	title: string;
};

export type ArticlePage = {
	article: ArticleMeta;
	title: string;
	Content: ComponentType;
};

type ArticleDefinition = ArticleMeta & {
	load: ArticleLoader;
};

/*====================================
 * Our metadata, the index of articles
 *====================================*/
export const ARTICLES: ArticleDefinition[] = [
	{
		slug: 'understanding-memo-usememo-and-usecallback-once-and-for-all',
		tag: 'React',
		date: '2026-02-21T17:59:28.202Z',
		excerpt: '',
		load: () =>
			import('@/content/articles/understanding-memo-usememo-and-usecallback-once-and-for-all.mdx'),
	},
	{
		slug: 'shipping-small-features-without-losing-momentum',
		tag: 'Process',
		date: '2026-02-21T18:42:00.000Z',
		excerpt:
			'A lightweight framework for planning, shipping, and validating tiny slices.',
		load: () =>
			import('@/content/articles/shipping-small-features-without-losing-momentum.mdx'),
	},
];

function fallbackTitleFromSlug(slug: string): string {
	return slug
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export async function getArticleListItems(): Promise<ArticleListItem[]> {
	return Promise.all(
		ARTICLES.map(async ({ load, ...article }) => {
			const { title } = await load();

			return {
				...article,
				title: title ?? fallbackTitleFromSlug(article.slug),
			};
		}),
	);
}

/*=================================================
 * Finds an article by slug and loads its MDX component.
 *=================================================*/
export async function getArticlePageBySlug(
	slug: string,
): Promise<ArticlePage | undefined> {
	const articleDefinition = ARTICLES.find(article => article.slug === slug);

	if (!articleDefinition) {
		return undefined;
	}

	const { load, ...article } = articleDefinition;
	const { default: Content, title } = await load();

	return {
		article,
		title: title ?? fallbackTitleFromSlug(article.slug),
		Content,
	};
}
