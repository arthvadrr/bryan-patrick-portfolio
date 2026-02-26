'use client';

import { ARTICLES } from '@/app/(site)/articles';
import { formatDate } from '../../../../components/util';
import GradientLink from '../../../../components/GradientLink';
import { Box, List, ListItem, Card, Typography, Chip, Stack, useTheme } from '@mui/material';

export default function ArticlesPage() {
  const retroTheme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Typography
        variant='h1'
        sx={{ my: 1 }}
      >
        Featured Articles
      </Typography>
      <List sx={{ p: 0 }}>
        {ARTICLES.map((article) => {
          if (article.isFeatured) {
            return (
              <ListItem
                key={`article-${article.slug}`}
                sx={{ px: 0 }}
              >
                <Card sx={{ p: 4, width: '100%' }}>
                  <GradientLink href={`/articles/${article.slug}`}>
                    <Typography variant='h3'>{article.title}</Typography>
                  </GradientLink>
                  <Typography>{article.excerpt}</Typography>
                  <Stack
                    direction='row'
                    sx={{ alignItems: 'center', gap: 1 }}
                  >
                    <Typography
                      component='span'
                      sx={{ fontSize: 16 }}
                    >
                      {formatDate(article.date)}
                    </Typography>
                    <Chip
                      component='a'
                      href='/articles?tag=react'
                      label='React'
                      variant='outlined'
                      rel='tag'
                      sx={{
                        my: 2,
                        cursor: 'pointer',

                        '&:hover': {
                          backgroundImage: retroTheme.gradients.gradientLink,
                        },
                      }}
                    />
                  </Stack>
                  <GradientLink
                    href={`/articles/${article.slug}`}
                    sx={{ pt: 4 }}
                  >
                    Read more
                  </GradientLink>
                </Card>
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );
}
