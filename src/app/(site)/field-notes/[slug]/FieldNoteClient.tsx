"use client";

import { Chip, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { FieldNoteMeta } from "../index";

type FieldNoteClientProps = {
  fieldNote: FieldNoteMeta;
  title: string;
  children: ReactNode;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function FieldNoteClient({ fieldNote, title, children }: FieldNoteClientProps) {
  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h1">
        {title}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={fieldNote.tag} size="small" />
        <Typography variant="body2" color="text.secondary">
          {formatDate(fieldNote.date)}
        </Typography>
      </Stack>
      <Stack className="field-note-body" spacing={2}>
        {children}
      </Stack>
    </Stack>
  );
}
