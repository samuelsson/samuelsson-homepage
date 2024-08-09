// eslint-disable-next-line camelcase
import { Montserrat, Noto_Sans_Mono } from 'next/font/google';

/**
 * Every time we call the Google font function, that font is hosted as one
 * instance in the application. By doing this in a helper function and
 * exporting the constant we only have one instance.
 *
 * https://nextjs.org/docs/basic-features/font-optimization#reusing-fonts
 */

export const fontMontserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const fontNotoSansMono = Noto_Sans_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
});
