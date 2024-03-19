import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/navigation';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<RootLayoutProps, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'app.home' });

  return {
    title: 'Colochub',
    description: t('metadataDescription'),
  };
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);

  let translation;
  try {
    translation = (await import(`../../translation/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={translation}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
