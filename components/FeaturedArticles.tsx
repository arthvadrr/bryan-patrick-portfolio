import { ARTICLES } from '@/app/(site)/articles';
import RetroBorder from './RetroBorder';
import GradientLink from './GradientLink';
import { Box, List, ListItem, Card, Typography } from '@mui/material';

export default function FeaturedArticles() {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Typography
        component='h2'
        variant='h3'
        sx={{ my: 1 }}
      >
        Featured Articles
      </Typography>
      <List>
        {ARTICLES.map((article) => {
          if (article.isFeatured) {
            return (
              <ListItem key={`article-${article.slug}`}>
                <Card sx={{ p: 2, width: '100%' }}>
                  <GradientLink
                    href={`/articles/${article.slug}`}
                    sx={{ mb: 1 }}
                  >
                    <Typography variant='h3'>{article.title}</Typography>
                  </GradientLink>
                  <Typography>{article.excerpt}</Typography>
                </Card>
              </ListItem>
            );
          }
        })}
        <RetroBorder
          position='left'
          glowIntensity={2}
          length='100%'
          offset='0%'
          showSideBlends
        />
      </List>
      <GradientLink
        href='/articles'
        sx={{
          my: 1,

          '&:after': {
            content: '" →"',
            fontSize: 22,
          },
        }}
      >
        View all articles
      </GradientLink>
    </Box>
  );
}
