import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import { getFieldNoteListItems } from "./index";

export default async function FieldNotesPage() {
  const fieldNotes = await getFieldNoteListItems();

  return (
    <Stack spacing={3}>
      <Typography variant="h1">Field Notes</Typography>
      <Stack component="ul" spacing={1.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
        {fieldNotes.map((fieldNote) => (
          <li key={fieldNote.slug}>
            <Link href={`/field-notes/${fieldNote.slug}`}>{fieldNote.title}</Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
