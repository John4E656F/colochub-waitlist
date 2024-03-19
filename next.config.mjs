/** @type {import('next').NextConfig} */
import NextIntlPlugin from 'next-intl/plugin';

const withNextIntl = NextIntlPlugin('./i18n.tsx');
const nextConfig = {};

export default withNextIntl(nextConfig);
