import { Tabs } from '@mantine/core';

import behind from '/img/noimage.webp';
import absence from '/img/noimage.webp';

import hakata from '/img/noimage.webp';
import kokura from '/img/noimage.webp';

export default function Others() {

    return (
        <div className="p-2">
            <Tabs defaultValue="address">
                <Tabs.List grow>
                    <Tabs.Tab value="address">
                        緊急連絡先
                    </Tabs.Tab>
                    
                    <Tabs.Tab value="bring">
                        持ち物
                    </Tabs.Tab>

                    <Tabs.Tab value="day1">
                        朝
                    </Tabs.Tab>

                    <Tabs.Tab value="bus">
                        バス駐車場
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="address">
                    <div>
                        <p className="text-2xl text-center p-2 font-bold">緊急連絡先</p>
                        <ul>
                            <li><span className="font-bold text-xl">・高校</span><br /></li>
                            <li><span className="font-bold text-xl">・学校</span><br /></li>
                            <li><span className="font-bold text-xl">・携帯</span><br /></li>
                            {/*<li><span className="font-bold text-xl">・保護者携帯</span><br /><input className="rounded-lg outline-black border-black" placeholder="090-1234-5678"></input></li>*/}
                        </ul>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="bring">
                    <div>
                        <p className="text-2xl text-center p-2 font-bold">持ち物リスト</p>
                        <ul>
                        </ul>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="day1">
                    <div>
                        <p className="text-2xl text-center p-2 font-bold">朝</p>
                        <p className='pb-2'><span className="font-bold text-xl">集合場所</span><br /></p>
                        <p className='pb-2'><span className="font-bold text-xl">遅刻</span></p>
                        <div className='flex justify-center'>
                            <img src={behind} alt='遅刻' />
                        </div>
                        <p className='pb-2'><span className="font-bold text-xl">欠席</span></p>
                        <div className='flex justify-center'>
                            <img src={absence} alt='欠席' />
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="bus">
                    <div>
                        <p className='pb-2'><span className="font-bold text-xl">バス駐車場</span></p>
                        <div className='flex justify-center'>
                            <img src={hakata} alt='遅刻' />
                        </div>
                        <p className='pb-2'><span className="font-bold text-xl">バス駐車場</span></p>
                        <div className='flex justify-center'>
                            <img src={kokura} alt='欠席' />
                        </div>
                    </div>
                </Tabs.Panel>

            </Tabs>
            
        </div>
    )
}