import '@mantine/core/styles.css';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { userPrefs } from './store/cookie';
import { log } from './db/index';

import "./tailwind.css";
//import '/style/style.css';
import Menu from './menu';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const url = new URL(request.url);

  let loginid;

  if (cookie.login) {
    loginid = cookie.loginid;
  } else {
    loginid = '';
  }

  const method = request.method;
  const path = url.pathname;
  const useragent = request.headers.get("User-Agent") || '';
  const contenttype = request.headers.get("Content-Type") || '';

  await log(loginid, method, path, useragent, contenttype);

  if (url.pathname === '/auth/login') {
    return null;
  }

  if (url.pathname === '/auth/register') {
    return null;
  }

  if (!cookie.login) {
    return redirect('/auth/login');
  }

  // cookie.focusがtrueの時だけ返す
  /*if (cookie.focus) {
    const ftime = cookie.focustime;
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    if (new Date(ftime) <= tenMinutesAgo) {
      return cookie.focus;
    }
    return null;
  }*/

  return null;
}

/*export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = new URLSearchParams(await request.text());
  const googleMapsLink = formData.get('googleMapsLink');

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  await postPlace(cookie.loginid, googleMapsLink || '');
  return null;
};*/

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "/style/style.css",
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <div style={{ minHeight: "100vh", }} className='pb-16 bg-yellow-50'>
          <MantineProvider>{children}</MantineProvider>
          <Menu />
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}


