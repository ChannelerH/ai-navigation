import {
  insertAiTool
} from "@/app/models/gpts";
import { respData, respErr } from "@/app/utils/resp";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { name, url, username, email } = params;
      const res = await insertAiTool(name, url, username, email);
      return respData(res)
    }
  } catch (e) {
    console.log("insert data failed: ", e);
    return respErr("insert data failed");
  }
}
