import { BsDownload } from "react-icons/bs";
import GptsDetail from "@/app/components/GptsDetail";
import { findByNickName, findDetailByNickName } from "@/app/models/gpts";
import { AiTool, AiToolDetail } from "@/app/types/aiTool";

async function getData(nickname: string): Promise<AiTool | undefined> {
  if (!nickname) {
    return;
  }

  const tools = await findByNickName(nickname);
  return tools;
}

async function getDetail(nickname: string): Promise<AiToolDetail | undefined> {
  if (!nickname) {
    return;
  }

  const detail = await findDetailByNickName(nickname);
  return detail;
}

export default async ({ params }: { params: { nickname: string } }) => {
  const data = await getData(params.nickname);
  const detail = await getDetail(params.nickname);

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {data && <GptsDetail tool={data} detail={detail} />}
      </div>
    </section>
  );
};
