import { respData, respErr } from "@/app/utils/resp";

import { getToolByName } from "@/app/models/gpts";
import { searchGpts } from "@/app/services/gpts";

export async function POST(req: Request) {
  const { question, keyword } = await req.json();
  if (!question && !keyword) {
    return respErr("invalid params");
  }

  if (keyword) {
    const data = await getToolByName(keyword);
    return respData(data);
  }

  const dbData = await getToolByName(question);
  // const vectorData = await searchGpts(question);
  console.log("dbData", dbData);
  // console.log("vectorData", vectorData);

  // const data = mergeArraysUnique(dbData, vectorData);

  return respData(dbData);
}

function mergeArraysUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
