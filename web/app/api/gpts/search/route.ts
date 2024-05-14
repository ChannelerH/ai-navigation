import { respData, respErr } from "@/app/utils/resp";

import { getToolByName, getAiToolTotalCountByName } from "@/app/models/gpts";

export async function POST(req: Request) {
  const { question, keyword, limit } = await req.json();
  if (!question && !keyword) {
    return respErr("invalid params");
  }

  if (keyword) {
    const data = await getToolByName(keyword, limit);
    const count = getAiToolTotalCountByName(keyword);
    return respData({
      data: data,
      count: count,
    });
  }

  const dbData = await getToolByName(question, limit);
  const dbCount = getAiToolTotalCountByName(question);
  // const vectorData = await searchGpts(question);
  console.log("dbData", dbData);
  // console.log("vectorData", vectorData);

  // const data = mergeArraysUnique(dbData, vectorData);

  return respData({
    rows: dbData,
    count: dbCount,
  });
}

function mergeArraysUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
