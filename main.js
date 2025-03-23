import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.DATABASE_ID;
let hasMore = true;
let startCursor = undefined;
let totalResults = [];

while (hasMore) {
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    start_cursor: startCursor
  });

  totalResults = totalResults.concat(response.results);
  hasMore = response.has_more;
  startCursor = response.next_cursor;
}

console.log("Total de itens encontrados:", totalResults.length);
