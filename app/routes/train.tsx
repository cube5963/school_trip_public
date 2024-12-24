import { Tabs } from '@mantine/core';

import s501 from '/img/noimage.webp';
import s11 from '/img/noimage.webp';
import s36 from '/img/noimage.webp';
import s554 from '/img/noimage.webp';
import s518 from '/img/noimage.webp';

export default function Train() {
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
                    <Tabs.Tab value="day4">
                        4日目
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="day1">
                    <Tabs defaultValue="s501">
                        <Tabs.List grow>
                            <Tabs.Tab value="s501">
                                xx 号
                            </Tabs.Tab>
                            <Tabs.Tab value="s11">
                                xx 号
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="s501">
                            <div className="flex justify-center pt-4">
                                <img src={s501} alt="xx号" />
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="s11">
                            <div className="flex justify-center pt-4">
                                <img src={s11} alt="xx号" />
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </Tabs.Panel>

                <Tabs.Panel value="day2">
                    <Tabs defaultValue="s36">
                        <Tabs.List grow>
                            <Tabs.Tab value="s36">
                                xx号
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="s36">
                            <div className="flex justify-center pt-4">
                                <img src={s36} alt="xx号" />
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </Tabs.Panel>

                <Tabs.Panel value="day3">
                    <Tabs defaultValue="s554">
                        <Tabs.List grow>
                            <Tabs.Tab value="s554">
                                xx号
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="s554">
                            <div className="flex justify-center pt-4">
                                <img src={s554} alt="xx号" />
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </Tabs.Panel>

                <Tabs.Panel value="day4">
                    <Tabs defaultValue="s518">
                        <Tabs.List grow>
                            <Tabs.Tab value="s518">
                                xx号
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="s518">
                            <div className="flex justify-center pt-4">
                                <img src={s518} alt="xx号" />
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}