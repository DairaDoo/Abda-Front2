// // _app.tsx
// import { AppProps } from 'next/app';
// import router, { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { IntlProvider } from 'next-intl';
// import enMessages from '../messages/en.json'; // Importa tus mensajes en inglés
// import esMessages from '../messages/es.json'; // Importa tus mensajes en español

// const messages = {
//   en: enMessages,
//   es: esMessages,
// };

// function MyApp({ Component, pageProps }: AppProps) {
//   const { locale } = useRouter();

//   // Establecer el idioma predeterminado si no está definido
//   useEffect(() => {
//     if (!locale) {
//       // Establecer el idioma predeterminado aquí
//       // Por ejemplo, inglés como idioma predeterminado
//       const defaultLocale = 'en';
//       router.push(`/${defaultLocale}`);
//     }
//   }, []);

//   // Renderizar la aplicación con IntlProvider
//   return (
//     <IntlProvider messages={messages[locale as keyof typeof messages]} locale={locale || 'en'}>
//       <Component {...pageProps} />
//     </IntlProvider>
//   );
// }

// export default MyApp;
