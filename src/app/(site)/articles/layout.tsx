import type { ReactNode } from 'react';
import ArticlesTemplate from '../../../../components/templates/ArticlesTemplate';

export default function Page({ children }: { children: ReactNode }) {
  return <ArticlesTemplate>{children}</ArticlesTemplate>;
}
