import { ActionFunctionArgs } from "@remix-run/node";
import { userPrefs } from '../store/cookie';
import { getSchedules } from './../db/index';
import { useLoaderData, redirect } from "@remix-run/react";
import { useEffect, useRef, useState, useCallback } from 'react';
import kokoImage from '/img/noimage.webp';
import { Tabs } from '@mantine/core';

export const loader = async ({ request }: ActionFunctionArgs) => {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};

    const isadmin = cookie.admin;

    if(isadmin){
        return redirect('/admin/schedule');
    }

    const loginid = cookie.loginid;

    const schedulesByDay = await Promise.all(
        [1, 2, 3, 4].map(day => getSchedules(loginid, day) || [])
    );

    schedulesByDay.forEach(daySchedules => 
        daySchedules.sort((a: { start: Date }, b: { start: Date }) => a.start.getTime() - b.start.getTime())
    );

    return schedulesByDay;
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
    const schedulesByDay = useLoaderData<Schedule[][]>();
    const [currentTime, setCurrentTime] = useState(new Date());
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
            const schedule = schedulesByDay.flat().find((_, idx) => idx === index);
            return schedule && isCurrent(schedule.start, schedulesByDay.flat()[index + 1]?.start);
        });

        if (currentScheduleIndex !== -1 && scheduleRefs.current[currentScheduleIndex]) {
            scheduleRefs.current[currentScheduleIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [schedulesByDay, isCurrent]);

    const toJST = (utcDateString: string | null) => {
        if (!utcDateString) return "";
        const date = new Date(utcDateString);
        return date.toLocaleTimeString("ja-JP", { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 vg">
            <Tabs defaultValue="1日目" className="bg-white shadow rounded-lg">
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
    
                {schedulesByDay.map((schedules, dayIndex) => (
                    <Tabs.Panel value={`${dayIndex + 1}日目`} key={dayIndex} className="p-4">
                        {schedules.length === 0 ? (
                            <p className="text-gray-500 italic">この日のスケジュールはありません。</p>
                        ) : (
                            schedules.map((schedule, idx) => {
                                const nextSchedule = schedules[idx + 1];
                                const isCurrentSchedule = isCurrent(schedule.start, nextSchedule?.start);
    
                                return (
                                    <div
                                        key={schedule.id}
                                        ref={el => (scheduleRefs.current[idx + dayIndex * schedules.length] = el)}
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
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    );     
}
