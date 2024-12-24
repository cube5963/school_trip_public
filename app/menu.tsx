import { Link } from "@remix-run/react";

import Home from "/img/icon/home.webp";
import Calendar from "/img/icon/calendar-month.webp";
import Building from "/img/icon/building.webp";
import Train from "/img/icon/train.webp";
import Notes from "/img/icon/notes.webp";
import Logout from "/img/icon/logout.webp";

export default function Menu() {
    return (
        <div className="fixed bottom-0 w-full text-white p-4" style={{ backgroundColor: 'rgb(20, 40, 60)' }}>
          <div className="grid grid-cols-6 gap-6 text-center">
            <Link to="/" className="flex justify-center items-center filter invert brightness-0">
              <img src={Home} alt="Home" className="w-8 h-8" />
            </Link>
            <Link to="/schedule/day" className="flex justify-center items-center filter invert brightness-0">
              <img src={Calendar} alt="スケジュール" className="w-8 h-8" />
            </Link>
            <Link to="/hotel" className="flex justify-center items-center filter invert brightness-0">
              <img src={Building} alt="ホテル" className="w-8 h-8" />
            </Link>
            <Link to="/train" className="flex justify-center items-center filter invert brightness-0">
              <img src={Train} alt="電車" className="w-8 h-8" />
            </Link>
            <Link to="/others" className="flex justify-center items-center filter invert brightness-0">
              <img src={Notes} alt="その他" className="w-8 h-8" />
            </Link>
            <Link to="/auth/logout" className="flex justify-center items-center filter invert brightness-0">
              <img src={Logout} alt="ログアウト" className="w-8 h-8" />
            </Link>
          </div>
        </div>
      );
}