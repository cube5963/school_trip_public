import { Form, redirect } from "@remix-run/react";
import { userPrefs } from '../store/cookie';

export const action = async () => {
    const newCookie = {
        loginid: '',
        login: false,
    }

    return redirect('/auth/login', {
        headers: {
            "Set-Cookie": await userPrefs.serialize(newCookie),
        },
    });
}

export default function Logout() {

    return (
        <div className="flex items-center justify-center min-h-screen p-4 pb-16">
            <div className="max-w-md w-full bg-white/80 rounded-lg shadow-md p-6">
                <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">ログアウト</h1>
                <p className="text-gray-600 text-center mb-6">ログアウトする場合、以下のボタンを押してください。</p>
                <Form method="post" className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
                    >
                        ログアウト
                    </button>
                </Form>
            </div>
        </div>
    );
    
}