"use client";

import { AiTool } from "@/app/types/aiTool";
import { Button, Spin, Popover } from 'antd';
import { 
  useState, 
  useEffect,
  Dispatch,
  SetStateAction
 } from "react";
import './index.css';
import Link from "next/link";

interface Props {
  setGpts: Dispatch<SetStateAction<AiTool[]>>;
  gpts: AiTool[];
  loading: boolean;
  gptsCount: number;
}

export default ({ setGpts, gpts, gptsCount, loading }: Props) => {
  const [page, setPage] = useState(1);
  const size = 50;
  let isShowLoadingButton = false;
  if (gptsCount > size) {
    isShowLoadingButton = true;
  }

  const [pageSize, setPageSize] = useState(size);
  const [loadedData, setLoadedData] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); 
  const [loadingMore, setLoadingMore] = useState(false); // 新状态：控制加载更多按钮的加载动画

  useEffect(() => {
    setTimeout(() => {
      setLoadedData(true);
    }, 2500);
  }, [gpts]);

  const fetchMoreGpts = async () => {
    setLoadingMore(true); // 开始加载更多数据时，设置loadingMore为true
    const params = {
      last_id: 0,
      page: page + 1,
      size: pageSize
    };

    try {
      const resp = await  fetch("/api/gpts/pagination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        if (res.data && res.data.rows.length > 0) {
          // Update page number and append new data
          setPage(page + 1);
          const newData = gpts.concat(res.data.rows);
          setGpts(newData);
        } else {
          // No more data to load, hide the "Load More" button
          setHasMoreData(false);
        }
      }

      setLoadingMore(false); // 数据加载完成后，设置loadingMore为false
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4" style={{minHeight: 'calc(100vh - 400px)'}}>
          <div className="mb-8 gap-5 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {gpts.map((item: AiTool, idx: number) => {
              let skip_url = item.url
              if (item.nick_name) {
                  skip_url = `/p/${item.nick_name}`
              }
              return (
              <Link href={skip_url} target="_blank" key={idx}>
              <div key={idx} className="relative h-[360px]" style={{overflow:'hidden'}}>
                <div className="bg-white flex flex-col justify-between card-container hover:shadow-lg hover:scale-105 transition-all rounded-t-2xl rounded-b-2xl"
                style={{height: '100%'}}>
                  <div className="flex-shrink-0" style={{ height: '200px'}}>
                    <div className="flex items-center justify-center h-full p-4">
                      <div style={{ width: "100%", height: "100%" }}>
                        <img
                          src={item.avatar_url}
                          alt={item.name}
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                          }}
                          rel="nofollow"/>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h6 className="text-base font-semibold">{item.name}</h6>
                    <button 
                    className="ml-auto" 
                    onClick={(event) => {
                      event.stopPropagation();
                      window.open(item.url, '_blank', 'noopener,noreferrer');
                    }}
                     title="Aixy AI" 
                     style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 text-sm text-neutral-600" style={{flex: 1}}>
                    <Popover content={item.description} overlayStyle={{
                      width: '400px'
                    }}>
                      <p style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        // whiteSpace: 'nowrap',
                        height: '38px',
                      }} className="g-l-item-desc">{item.description}</p>
                    </Popover>
                  </div>
                </div>
              </div>
              </Link>
            )})}
          </div>
      </div>
      <div className="text-center" style={{position: 'absolute',
        // top: '50%',
        bottom: '10px',
        left: '50%',
        transform: 'translate(-50%, -50%)'}}>
      {loading ? (
          <Spin />
        ) : (
          loadedData && isShowLoadingButton && (
            hasMoreData ? (
              <Button onClick={fetchMoreGpts} disabled={loadingMore}>
                {loadingMore ? <Spin /> : "Load More"}
              </Button>
            ) : (
              <p>No more data available.</p>
            )
          )
        )}
      </div>
    </section>
  );
};