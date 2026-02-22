"use client";

import { Chip, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { ArticleMeta } from "../index";

type ArticleClientProps = {
  article: ArticleMeta;
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

export default function ArticleClient({ article, title, children }: ArticleClientProps) {
  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h1">
        {title}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={article.tag} size="small" />
        <Typography variant="body2" color="text.secondary">
          {formatDate(article.date)}
        </Typography>
      </Stack>
      <Stack className="article-body" spacing={2}>
        {children}
      </Stack>
    </Stack>
  );
}
