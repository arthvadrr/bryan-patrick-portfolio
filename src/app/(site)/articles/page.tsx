import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import { getArticleListItems } from "./index";

export default async function ArticlesPage() {
  const articles = await getArticleListItems();

  return (
    <Stack spacing={3}>
      <Typography variant="h1">Articles</Typography>
      <Stack component="ul" spacing={1.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
