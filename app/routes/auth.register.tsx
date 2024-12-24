import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { createAccount } from '../db/index';
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
  const checkpassword = formData.get('checkpassword') as string;

  if (password !== checkpassword) {
    //alert('パスワードが一致しません');
    return null;
  }

  const status = await createAccount(loginid, password);

  //console.log(status);

  if (status === Status_Messages.Success) {
    //alert('パスワードが設定されました');
    return redirect('/');
  } else if (status === Status_Messages.PasswordAlreadyExists) {
    //alert('パスワードはすでに存在します');
    return redirect('/auth/login');
  } else if (status === Status_Messages.AccountNotFound) {
    //alert('アカウントが見つかりません');
    return null;
  } else {
    //alert('エラー');
    return null;
  }
}

export default function setPass() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 pb-16">
      <div className="max-w-md w-full bg-white/80 rounded-lg shadow-lg p-8">
        <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">パスワード設定</h1>
        <Form method="post">
          <div className="mb-6">
            <label htmlFor="loginid" className="block text-gray-700 font-semibold mb-2">ログインID</label>
            <input
              type="text"
              id="loginid"
              name="loginid"
              placeholder="j2023xx"
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
          <div className="mb-6">
            <label htmlFor="checkpassword" className="block text-gray-700 font-semibold mb-2">パスワード確認</label>
            <input
              type="password"
              id="checkpassword"
              name="checkpassword"
              required
              className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out"
            >
              パスワード設定
            </button>
          </div>
        </Form>
      </div>
    </div>
  );

}