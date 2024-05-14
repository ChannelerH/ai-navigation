"use client";

import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { AiTool } from "@/app/types/aiTool";

interface Props {
  setGpts: Dispatch<SetStateAction<AiTool[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setGptsCount: Dispatch<SetStateAction<number>>;
}

export default ({ setGpts, setLoading, setGptsCount }: Props) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);

    if (e.target.value.trim() === "") {
      handleSubmit("", "allAiTools", 50);
    }
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit("", content, 50);
      }
    }
  };

  const handleSubmit = async (keyword: string, question: string, limit: number) => {
    try {
      const uri = "/api/gpts/search";
      const params = {
        keyword: keyword,
        question: question,
        limit: limit,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          setGpts(res.data.rows);
        }
        setGptsCount(res.data.count);
      }
    } catch (e) {
      console.log("search failed: ", e);
    }
  };

  useEffect(() => {
    if (content) {
      // handleSubmit(content, "");
    }
  }, [content]);

  return (
    <section className="relatve mt-4 md:mt-8">
      <div className="mx-auto w-full max-w-2xl px-6 text-center">
        <div className="flex items-center relative">
          <input
            type="text"
            className="flex-1 px-4 py-3 border-2 border-primary bg-white rounded-lg text-sm"
            placeholder="find your ai tools"
            ref={inputRef}
            value={content}
            disabled={inputDisabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute right-4 cursor-pointer"
            onClick={() => {
              if (content) {
                handleSubmit("", content, 50);
              }
            }}
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};
