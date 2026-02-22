import type { ComponentType } from 'react';

/*=================================================
 * "The mind of the subject will desperately
 * struggle to create memories where none exist..."
 *
 * Barriers to Trans-Dimensional Travel
 * - R. Lutece (Bioshock Infinite)
 *=================================================*/

type ISODateString = string;
type FieldNoteMdxContent = { default: ComponentType; title?: string };
type FieldNoteLoader = () => Promise<FieldNoteMdxContent>;

export type FieldNoteMeta = {
	slug: string;
	tag: string;
	date: ISODateString;
	excerpt: string;
};

export type FieldNoteListItem = FieldNoteMeta & {
	title: string;
};

export type FieldNotePage = {
	fieldNote: FieldNoteMeta;
	title: string;
	Content: ComponentType;
};

type FieldNoteDefinition = FieldNoteMeta & {
	load: FieldNoteLoader;
};

/*====================================
 * Our metadata, the index of field notes
 *====================================*/
export const FIELD_NOTES: FieldNoteDefinition[] = [
	{
		slug: 'understanding-memo-usememo-and-usecallback-once-and-for-all',
		tag: 'React',
		date: '2026-02-21T17:59:28.202Z',
		excerpt: '',
		load: () =>
			import('@/content/field-notes/understanding-memo-usememo-and-usecallback-once-and-for-all.mdx'),
	},
	{
		slug: 'shipping-small-features-without-losing-momentum',
		tag: 'Process',
		date: '2026-02-21T18:42:00.000Z',
		excerpt:
			'A lightweight framework for planning, shipping, and validating tiny slices.',
		load: () =>
			import('@/content/field-notes/shipping-small-features-without-losing-momentum.mdx'),
	},
];

function fallbackTitleFromSlug(slug: string): string {
	return slug
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export async function getFieldNoteListItems(): Promise<FieldNoteListItem[]> {
	return Promise.all(
		FIELD_NOTES.map(async ({ load, ...fieldNote }) => {
			const { title } = await load();

			return {
				...fieldNote,
				title: title ?? fallbackTitleFromSlug(fieldNote.slug),
			};
		}),
	);
}

/*======================================================
 * Finds a field note by slug and loads its MDX component.
 *======================================================*/
export async function getFieldNotePageBySlug(
	slug: string,
): Promise<FieldNotePage | undefined> {
	const fieldNoteDefinition = FIELD_NOTES.find(fieldNote => fieldNote.slug === slug);

	if (!fieldNoteDefinition) {
		return undefined;
	}

	const { load, ...fieldNote } = fieldNoteDefinition;
	const { default: Content, title } = await load();

	return {
		fieldNote,
		title: title ?? fallbackTitleFromSlug(fieldNote.slug),
		Content,
	};
}
