import {
  getAiToolTotalCount,
  getAiTools,
  getAiToolsByPage
} from "@/app/models/gpts";
import { respData, respErr } from "@/app/utils/resp";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { last_id, page, size, tab } = params;

      const count = await getAiToolTotalCount();
      const rows = await getAiToolsByPage(last_id, page, size);

      return respData({
        rows: rows,
        count: count,
      });
    }
  } catch (e) {
    console.log("get all tools failed: ", e);
    return respErr("get tools failed");
  }
}
