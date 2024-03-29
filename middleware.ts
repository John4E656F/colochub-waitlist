import createMiddleware from 'next-intl/middleware';
import { pathnames, locales } from './navigation';

export default createMiddleware({
  defaultLocale: 'en',
  localePrefix: 'always',
  locales,
  pathnames,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/', '/(en|fr|nl)/:path*'],
};
