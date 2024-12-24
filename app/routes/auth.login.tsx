import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { login as authenticateUser, checkFocus, checkAdmin } from '../db/index'; // サーバーサイドの認証関数
import { Status_Messages } from "~/enum/status";
import { userPrefs } from '../store/cookie';

export const loader = async ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  if (cookie.login) {
    return redirect('/');
  } else {
    return null;
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const loginid = formData.get('loginid') as string;
  const password = formData.get('password') as string;

  // 認証処理
  const status = await authenticateUser(loginid, password);

  //console.log(status);

  if (status === Status_Messages.Success) {
    //alert('ログインしました');
    const isfocus = await checkFocus(loginid);
    const isadmin = await checkAdmin(loginid);

    const newCookie = {
      loginid: loginid,
      login: true,
      focus: isfocus,
      admin: isadmin,
    }

    return redirect('/', {
      headers: {
        "Set-Cookie": await userPrefs.serialize(newCookie),
      },
    });

  } else if (status === Status_Messages.PasswordNotMatch) {
    //alert('パスワードが一致しません');
    return null;
  } else if (status === Status_Messages.AccountNotFound) {
    //alert('アカウントが見つかりません');
    return null;
  } else if (status === Status_Messages.PasswordNotFound) {
    return redirect('/auth/register');
  }

  return null;
};

export default function Login() {

  return (
    <div className="flex items-center justify-center min-h-screen p-6 pb-16">
      <div className="max-w-md w-full bg-white/80 rounded-lg shadow-lg p-8">
        <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">ログイン</h1>
        <Form method="post">
          <div className="mb-6">
            <label htmlFor="loginid" className="block text-gray-700 font-semibold mb-2">ログインID</label>
            <input
              type="text"
              id="loginid"
              name="loginid"
              required
              className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out"
            >
              ログイン
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
