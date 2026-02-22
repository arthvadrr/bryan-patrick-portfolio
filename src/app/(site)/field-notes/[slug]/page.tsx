import { FIELD_NOTES, getFieldNotePageBySlug } from "../index";
import { notFound } from "next/navigation";
import FieldNoteClient from "./FieldNoteClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function getFieldNoteSlugs() {
  return FIELD_NOTES.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const fieldNotePage = await getFieldNotePageBySlug(slug);

  if (!fieldNotePage) {
    notFound();
  }

  const { fieldNote, title, Content } = fieldNotePage;

  return (
    <FieldNoteClient fieldNote={fieldNote} title={title}>
      <Content />
    </FieldNoteClient>
  );
}
