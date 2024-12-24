import { ActionFunctionArgs } from "@remix-run/node";
import { userPrefs } from '../store/cookie';
import { getALLSchedules } from '../db/index'; 
import { useLoaderData, redirect } from "@remix-run/react";
import { useEffect, useRef, useState, useCallback } from 'react';
import kokoImage from '/img/noimage.webp';
import { Tabs } from '@mantine/core';
import pLimit from 'p-limit';

export const loader = async ({ request }: ActionFunctionArgs) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    const isadmin = cookie.admin;

    if (!isadmin) {
        return redirect('/');
    }
    const limit = pLimit(1)
    
    const schedulesByDayAndGroup = await Promise.all(
        [1, 2, 3, 4].map(day =>
            Promise.all(
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(group =>
                    //getALLSchedules(day, group) || []
                    limit(() => getALLSchedules(day, group) || [])
                )
            )
        )
    );

    // スケジュールを開始時刻でソート
    schedulesByDayAndGroup.forEach(daySchedules =>
        daySchedules.forEach(groupSchedules =>
            groupSchedules.sort((a: { start: Date }, b: { start: Date }) => a.start.getTime() - b.start.getTime())
        )
    );

    return schedulesByDayAndGroup;
};

type Schedule = {
    id: number;
    start: string;
    title: string;
    place?: string;
    destinations?: string;
    end?: string;
    content?: string;
    repletion?: string;
};

export default function ScheduleDay() {
    const schedulesByDayAndGroup = useLoaderData<Schedule[][][]>();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedGroup, setSelectedGroup] = useState(1); 
    const scheduleRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const isCurrent = useCallback((start: string, nextStart?: string) => {
        const startTime = new Date(start).getTime();
        const endTime = nextStart ? new Date(nextStart).getTime() : Infinity;
        const current = currentTime.getTime();

        return startTime <= current && current < endTime;
    }, [currentTime]);

    useEffect(() => {
        const currentScheduleIndex = scheduleRefs.current.findIndex((el, index) => {
            const schedule = schedulesByDayAndGroup.flat().find((_, idx) => idx === index);
            return schedule && isCurrent(schedule.start, schedulesByDayAndGroup.flat()[index + 1]?.start);
        });

        if (currentScheduleIndex !== -1 && scheduleRefs.current[currentScheduleIndex]) {
            scheduleRefs.current[currentScheduleIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [schedulesByDayAndGroup, isCurrent]);

    const toJST = (utcDateString: string | null) => {
        if (!utcDateString) return "";
        const date = new Date(utcDateString);
        return date.toLocaleTimeString("ja-JP", { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white">
                {/* 日付選択のタブ */}
                <Tabs
                    value={`${selectedDay}日目`}
                    onChange={(value) => setSelectedDay(parseInt(value.split("日目")[0]))}
                    className="bg-white shadow rounded-lg mb-4"
                >
                    <Tabs.List grow className="border-b border-gray-200">
                        {[1, 2, 3, 4].map(day => (
                            <Tabs.Tab
                                value={`${day}日目`}
                                key={day}
                                className="py-2 px-4 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500"
                            >
                                {`${day}日目`}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>

                {/* 班選択のタブ */}
                <Tabs
                    value={`${selectedGroup}班`}
                    onChange={(value) => setSelectedGroup(parseInt(value.split("班")[0]))}
                    className="bg-white shadow rounded-lg mb-4"
                >
                    <Tabs.List grow className="border-b border-gray-200">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(group => (
                            <Tabs.Tab
                                value={`${group}班`}
                                key={group}
                                className="py-2 px-4 text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500"
                            >
                                {`${group}班`}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>

                {/* 選択された日付と班のスケジュール表示 */}
                <div className="p-4">
                    {schedulesByDayAndGroup[selectedDay - 1][selectedGroup - 1].length === 0 ? (
                        <p className="text-gray-500 italic">この日のこの班のスケジュールはありません。</p>
                    ) : (
                        schedulesByDayAndGroup[selectedDay - 1][selectedGroup - 1].map((schedule, idx) => {
                            const nextSchedule = schedulesByDayAndGroup[selectedDay - 1][selectedGroup - 1][idx + 1];
                            const isCurrentSchedule = isCurrent(schedule.start, nextSchedule?.start);

                            return (
                                <div
                                    key={schedule.id}
                                    ref={el => (scheduleRefs.current[idx] = el)}
                                    className="flex flex-col md:flex-row border-b border-gray-200 py-4"
                                >
                                    <div className="flex md:w-1/4 p-4 bg-yellow-100 rounded-lg shadow-inner mb-4 md:mb-0 md:mr-4 items-start">
                                        {isCurrentSchedule && (
                                            <img src={kokoImage} alt="Current Schedule" className="w-10 h-10 mr-2" />
                                        )}
                                        <div>
                                            <div className="text-sm text-gray-700 mb-1 border-l-4 border-yellow-500 pl-2">
                                                {toJST(schedule.start)}
                                            </div>
                                            <div className="text-sm text-gray-500 italic border-b-2 border-yellow-200">
                                                {schedule.end ? toJST(schedule.end) : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:w-3/4 p-4 bg-blue-50 rounded-lg shadow-inner">
                                        <div className="mb-2">
                                            <span className="text-lg font-semibold text-gray-800">{schedule.content || ""}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-600"><strong>場所:</strong> {schedule.place ? (
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schedule.place)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {schedule.place}
                                                </a>
                                            ) : ""}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-600"><strong>行き先:</strong> {schedule.destinations ? (
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schedule.destinations)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {schedule.destinations}
                                                </a>
                                            ) : ""}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600"><strong>詳細:</strong> {schedule.repletion || ""}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
