import { notion } from './notion.js';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.DATABASE_ID;

getRelatoriosFormatados();

export async function getRelatoriosFormatados() {
    let hasMore = true;
    let startCursor = undefined;
    let allPages = [];
  
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor
      });
  
      allPages = allPages.concat(response.results);
  
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }
    console.log(allPages.length);
  
    return allPages.map(
    page => ({
      id: page.id,
      balance: page.properties['Balança']?.formula?.number || 0,
      outflow: page.properties['Saídas ']?.rollup?.number || 0,
      credit: page.properties['Fiado']?.formula?.number || 0,
      inflow: page.properties['Entradas']?.formula?.number || 0,
      date: new Date(page.properties['Data']?.date?.start)
    })
  );
}


