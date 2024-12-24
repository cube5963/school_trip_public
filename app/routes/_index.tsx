import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "修学旅行" },
  ];
};

export default function Index() {
  return (
    <div className="home">
      <div className="flex justify-center">
        <img src="/img/noimage.webp" alt="Title" className="w-[40%] h-[auto] inline-block"/>
        <img src="/img/noimage.webp" alt="Title" className="w-[40%] h-[auto] inline-block"/>
      </div>
      <div className="illusts">
        <div className="flex justify-center">
          <img src="/img/noimage.webp" alt="Title" className="w-[40%] h-[auto] pb-10 inline-block"/>
        </div>
        <div className="flex justify-center">
          <img src="/img/noimage.webp" alt="Title" className="w-[45%] h-[auto] pr-2 inline-block"/>
          <img src="/img/noimage.webp" alt="Title" className="w-[45%] h-[auto] pl-2 inline-block"/>
        </div>
      </div>
      {/*<h1 className="Soviet">Union of Soviet Socialist Republics</h1>
      <h1 className="Soviet">☭</h1>*/}
    </div>
  );
}
