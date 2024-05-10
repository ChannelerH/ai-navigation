import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

import { Gpts } from "@/app/types/gpts";
import { isGptsSensitive } from "@/app/services/gpts";
import { AiTool } from "@/app/types/aiTool";
import { off } from "process";

export async function createTable() {
  const res = await sql`CREATE TABLE gpts (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(50) UNIQUE NOT NULL,
    org_id VARCHAR(50),
    name VARCHAR(50),
    description TEXT,
    avatar_url VARCHAR(255),
    short_url VARCHAR(100),
    author_id VARCHAR(50),
    author_name VARCHAR(50),
    created_at timestamptz,
    updated_at timestamptz,
    detail JSON 
);`;

  return res;
}

export async function insertRow(gpts: Gpts) {
  const res = await sql`INSERT INTO gpts 
    (uuid, org_id, name, description, avatar_url, short_url, author_id, author_name, created_at, updated_at, detail) 
    VALUES 
    (${gpts.uuid}, ${gpts.org_id}, ${gpts.name}, ${gpts.description}, ${gpts.avatar_url}, ${gpts.short_url}, ${gpts.author_id}, ${gpts.author_name}, ${gpts.created_at}, ${gpts.updated_at}, ${gpts.detail})
`;

  return res;
}

export async function getUuids(): Promise<string[]> {
  const res = await sql`SELECT uuid FROM gpts`;
  if (res.rowCount === 0) {
    return [];
  }

  const { rows } = res;
  let uuids: string[] = [];
  rows.forEach((row) => {
    uuids.push(row.uuid);
  });

  return uuids;
}

export async function getRows(last_id: number, limit: number): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE id > ${last_id} LIMIT ${limit} `;
  if (res.rowCount === 0) {
    return [];
  }

  const gpts: Gpts[] = [];
  const { rows } = res;

  rows.forEach((row) => {
    const gpt = formatGpts(row);
    if (gpt) {
      gpts.push(gpt);
    }
  });

  return gpts;
}

export async function getRowsByName(name: string): Promise<Gpts[]> {
  const keyword = `%${name}%`;
  const res =
    await sql`SELECT * FROM gpts WHERE name ILIKE ${keyword} ORDER BY sort DESC LIMIT 50`;

  return getGptsFromSqlResult(res);
}

export async function getRandRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE id > ${last_id} ORDER BY RANDOM() LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getLatestRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE id > ${last_id} ORDER BY created_at DESC LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getRecommendedRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE is_recommended=true AND id > ${last_id} ORDER BY sort DESC LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getHotRows(
  last_id: number,
  limit: number
): Promise<Gpts[]> {
  const res =
    await sql`SELECT * FROM gpts WHERE rating IS NOT null AND id > ${last_id} ORDER BY rating DESC, sort DESC LIMIT ${limit}`;

  return getGptsFromSqlResult(res);
}

export async function getTotalCount(): Promise<number> {
  const res = await sql`SELECT count(1) as count FROM gpts LIMIT 1`;
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function findByUuid(uuid: string): Promise<Gpts | undefined> {
  const res = await sql`SELECT * FROM gpts WHERE uuid = ${uuid} LIMIT 1`;
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const gpts = formatGpts(row);

  return gpts;
}

function getGptsFromSqlResult(res: QueryResult<QueryResultRow>): Gpts[] {
  if (res.rowCount === 0) {
    return [];
  }

  const gpts: Gpts[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const gpt = formatGpts(row);
    if (gpt) {
      gpts.push(gpt);
    }
  });

  return gpts;
}

function formatGpts(row: QueryResultRow): Gpts | undefined {
  const gpts: Gpts = {
    uuid: row.uuid,
    org_id: row.org_id,
    name: row.name,
    description: row.description,
    avatar_url: row.avatar_url,
    short_url: row.short_url,
    author_id: row.author_id,
    author_name: row.author_name,
    created_at: row.created_at,
    updated_at: row.updated_at,
    visit_url: "https://chat.openai.com/g/" + row.short_url,
    rating: row.rating,
  };

  try {
    gpts.detail = JSON.parse(JSON.stringify(row.detail));
  } catch (e) {
    console.log("parse gpts detail failed: ", e);
  }

  // todo 后续可放开
  // if (isGptsSensitive(gpts)) {
  //   return;
  // }

  return gpts;
}


export async function getAiToolTotalCount(): Promise<number> {
  const res = await sql`SELECT count(1) as count FROM ai_tools LIMIT 1`;
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}


export async function getAiTools(  
  last_id: number,
  limit: number
  ): Promise<AiTool[]> {
  const res =
  await sql`SELECT * FROM ai_tools WHERE id > ${last_id} ORDER BY id LIMIT ${limit}`;
  
  return getToolsFromSqlResult(res);
}


export async function getAiToolsByPage(  
  last_id: number,
  page: number,
  size: number,
  ): Promise<AiTool[]> {
  const offset = (page - 1) * size;
  const limit = size;

  const res =
  await sql`SELECT * FROM ai_tools WHERE id > ${last_id} ORDER BY id LIMIT ${limit} offset ${offset}`;
  
  return getToolsFromSqlResult(res);
}


function getToolsFromSqlResult(res: QueryResult<QueryResultRow>): AiTool[] {
  if (res.rowCount === 0) {
    return [];
  }

  const tools: AiTool[] = [];
  const { rows } = res;
  rows.forEach((row) => {
    const aiTool = formatTools(row);
    if (aiTool) {
      tools.push(aiTool);
    }
  });

  return tools;
}

export async function getToolByName(name: string): Promise<AiTool[]> {
  let res
  if (name == 'allAiTools') {
    res =
    await sql`SELECT * FROM ai_tools ORDER BY id LIMIT 50`;
  } else {
    const keyword = `%${name}%`;
    res =
      await sql`SELECT * FROM ai_tools WHERE name ILIKE ${keyword} ORDER BY id LIMIT 50`;
  }

  return getToolsFromSqlResult(res);
}

function formatTools(row: QueryResultRow): AiTool | undefined {
  const tool: AiTool = {
    name: row.name,
    description: row.description,
    avatar_url: row.avatar_url,
    url: row.url,
    tag: row.tag
  };

  return tool;
}