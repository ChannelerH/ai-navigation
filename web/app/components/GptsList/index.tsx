"use client";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiTool } from "@/app/types/aiTool";
import Image from "next/image";
import { ExternalLinkIcon } from '@heroicons/react/outline';

interface Props {
  gpts: AiTool[];
  loading: boolean;
}

export default ({ gpts, loading }: Props) => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {!loading ? (
          <div className="mb-8 gap-5 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {gpts.map((item: AiTool, idx: number) => (
              <div key={idx} className="relative h-[300px]">
                <div className="bg-white flex flex-col justify-between card-container hover:shadow-lg hover:scale-105 transition-all rounded-t-2xl rounded-b-2xl">
                  <div className="flex-shrink-0" style={{ height: "33.33%" }}>
                    <div className="flex items-center justify-center h-full p-4">
                      <div style={{ width: "100%", height: "100%" }}>
                        <Image
                          src={item.avatar_url}
                          alt=""
                          width={100}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                  <h6 className="text-base font-semibold">{item.name}</h6>
                  <a className="ml-auto" href={item.url} target="_blank" rel="noopener noreferrer nofollow" title="AI Tools">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"></path>
                    </svg>
                  </a>
                </div>
                <p className="p-4 text-sm text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto text-center">Loading data...</div>
        )}
      </div>
    </section>
  );
};