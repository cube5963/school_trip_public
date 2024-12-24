import { Tabs } from '@mantine/core';
import { getHotel } from './../db/index';
import { userPrefs } from '../store/cookie';
import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
    hotel: {
        hotel1: string;
        hotel2: string;
        hotel3: string;
    };
    isadmin: boolean;
}

export const loader = async ({ request }: ActionFunctionArgs): Promise<LoaderData> => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};

    const isadmin = cookie.admin || false; // デフォルト値を false に設定
    const loginid = cookie.loginid;

    const hotelData = await getHotel(loginid);

    const hotel = {
        hotel1: hotelData ? String(hotelData.hotel1) : '',
        hotel2: hotelData ? String(hotelData.hotel2) : '',
        hotel3: hotelData ? String(hotelData.hotel3) : '',
    };

    return { hotel, isadmin };
};

import day11 from '/img/noimage.webp';
import day12 from '/img/noimage.webp';
import day13 from '/img/noimage.webp';
import day31 from '/img/noimage.webp';
import day32 from '/img/noimage.webp';

import hotelp from '/img/noimage.webp';

export default function Hotel() {
    const { hotel, isadmin } = useLoaderData<LoaderData>();
    return (
        <div className='p-2'>
            <Tabs defaultValue="day1">
                <Tabs.List grow>
                    <Tabs.Tab value="day1">
                        1日目
                    </Tabs.Tab>
                    <Tabs.Tab value="day2">
                        2日目
                    </Tabs.Tab>
                    <Tabs.Tab value="day3">
                        3日目
                    </Tabs.Tab>
                    {isadmin && <Tabs.Tab value="admin">部屋割り</Tabs.Tab>}
                </Tabs.List>

                <Tabs.Panel value="day1">
                    <p className="text-2xl text-center p-2 font-bold">xxxホテル</p>
                    <p className="text-xl py-3">部屋番号:{hotel.hotel1}</p>
                    {/*<p className="text-xl py-3">客員:</p>*/}
                    <div>
                        <p className="text-2xl text-center p-5 font-bold">緊急連絡所轄機関</p>
                        <ul>
                            <li><span className="font-bold">・保健所</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・警察署</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・交番</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・消防署</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・病院</span><br />住所：<br />TEL：</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-2xl text-center p-5 font-bold">駐車場</p>
                        <div className='flex justify-center'>
                            <img src={day13} alt="朝食" />
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl text-center p-5 font-bold">朝食</p>
                        <div className='flex justify-center'>
                            <img src={day11} alt="朝食" />
                        </div>
                        <div className='flex justify-center'>
                            <img src={day12} alt="朝食" />
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="day2">
                    <p className="text-2xl text-center p-2 font-bold">xxxホテル</p>
                    <p className="text-xl py-3">部屋番号:{hotel.hotel2}</p>
                    {/*<p className="text-xl py-3">客員:</p>*/}
                    <div>
                        <p className="text-2xl text-center p-8 font-bold">緊急連絡所轄機関</p>
                        <ul>
                            <li><span className="font-bold">・病院</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・保健所</span><br />住所：</li>
                            <li><span className="font-bold">・警察署</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・防署</span><br />住所：<br />TEL：</li>
                        </ul>
                    </div>
                    {/*<div>
                        <p className="text-2xl text-center p-8 font-bold">朝食</p>
                        <img src="" alt="朝食" />
                        <img src="" alt="朝食" />
                    </div>*/}
                </Tabs.Panel>

                <Tabs.Panel value="day3">
                    <p className="text-2xl text-center p-2 font-bold">xxxホテル</p>
                    <p className="text-xl py-3">部屋番号:{hotel.hotel3}</p>
                    {/*<p className="text-xl py-3">客員:</p>*/}
                    <div>
                        <p className="text-2xl text-center p-8 font-bold">緊急連絡所轄機関</p>
                        <ul>
                            <li><span className="font-bold">・消防署</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・警察署</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・保健所</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・病院</span><br />住所：<br />TEL：</li>
                            <li><span className="font-bold">・医療センター</span><br />住所：<br />TEL：</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-2xl text-center p-8 font-bold">朝食</p>
                        <div className='flex justify-center'>
                            <img src={day31} alt="朝食" />
                        </div>
                        <div className='flex justify-center'>
                            <img src={day32} alt="朝食" />
                        </div>
                    </div>
                </Tabs.Panel>
                {/* 管理者専用パネル */}
                {isadmin && (
                    <Tabs.Panel value="admin">
                        <p className="text-2xl text-center p-2 font-bold">部屋割り</p>
                        <div className='flex justify-center'>
                            <img src={hotelp} alt="部屋割り" />
                        </div>
                    </Tabs.Panel>
                )}
            </Tabs>
        </div>
    )
}