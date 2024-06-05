import { BsChatDots } from "react-icons/bs";
import { Gpts } from "@/app/types/gpts";
import Preview from "./Preview";
import { getGptsTools } from "@/app/services/gpts";
import moment from "moment";
import { AiTool, AiToolDetail } from "@/app/types/aiTool";

interface Props {
  tool: AiTool;
  detail: AiToolDetail;
}

export default ({ tool, detail}: Props) => {

  return (
    <section>
      <div className="block overflow-hidden">
        <div className="w-[90%] md:max-w-5xl mx-auto mt-2 mb-4 flex">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div>
                  <a className="hover:text-blue-500" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 flex-shrink-0">
                      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Home</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-6 w-6 flex-shrink-0">
                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                  </svg>
                  <div className="ml-1 text-lg text-gray-500">{tool.name}</div>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mx-auto w-full px-5">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">{tool.name}</h1>
              <div className="mb-4 max-w-[628px] text-[#7c8aaa]">
                {/* <h2 className="text-xl">Linkz.ai 3.0: Boost Visitor Retention &amp; Performance, AI Tool</h2> */}
                <h2 className="text-lg">
                  {tool.description}
                </h2>
              </div>
              <a
                className="flex justify-center items-center rounded-md bg-[#ffa11b] px-4 py-3 text-md font-semibold text-white shadow-sm"
                target="_blank"
                rel="dofollow"
                href={tool.url}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                Open&nbsp;{tool.name}
              </a>
            </div>
        </div>
        <div className="w-[90%] md:max-w-5xl mx-auto mt-8 flex justify-center items-center">
          <a href={tool.url}>
            <img
              width="800"
              src={tool.avatar_url}
              className="border rounded-lg shadow-lg"
              alt="Aixy AI"
            />
          </a>
        </div>
        <div id="introduction">
          <div className="mx-auto w-full px-5 pt-6">
            <div>
              {/* <a className="link-text text-lg font-bold" href="/p/Linkz-ai-3-0/introduction"> */}
              <div className="link-text text-lg font-bold max-w-5xl mx-auto mt-8">
                <h2>{tool.name} Introduction</h2>
              </div>
              {/* </a> */}
              {/* <a className="ml-2 link-text" href="/p/Linkz-ai-3-0/introduction">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a> */}
               <div className="prose w-full max-w-5xl mx-auto mt-8 div-markdown-color">
                <p>
                 {detail.introduction}
                </p>
              </div>
            </div>
            <div>
              <div className="link-text text-lg font-bold max-w-5xl mx-auto mt-8">
                <h2>{tool.name} Features</h2>
              </div>
              <div className="prose w-full max-w-5xl mx-auto mt-8 div-markdown-color" style={{ whiteSpace: 'pre-wrap' }}>
                 {detail.features}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
