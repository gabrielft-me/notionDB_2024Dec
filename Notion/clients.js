import { notion } from './notion.js';

console.log(getClientePorId('11a14cac-f7ac-81a0-a637-fe347c545d34'));

export async function getClients() {
    const response = await notion.databases.query({
      database_id: process.env.CLIENTS_DB_ID
    });
    

    const cliente = response.results.find(c => c.id === '11a14cac-f7ac-81a0-a637-fe347c545d34');

    console.log(cliente);
    /*
    return response.results.map(page => ({
      id: page.id,
      lg_number: page.properties['nº LG']?.rich_text?.[0]?.plain_text || '',
      wlb_number: page.properties['nº WLB']?.rich_text?.[0]?.plain_text || '',
      patient: page.properties['Paciente']?.title?.[0]?.plain_text || '',
      exams: page.properties['Exames']?.multi_select?.map(e => e.name) || [],
      day: page.properties['Dia']?.date?.start || null,
      reason: page.properties['O que veio fazer?']?.rich_text?.[0]?.plain_text || '',
      method: page.properties['Método']?.select?.name || '',
      value: page.properties['Valor']?.number || 0,
      accounting_id: page.properties['Relatório']?.relation?.[0]?.id || null
    }));
    */
  }


  export async function getClientePorId(idProcurado) {
    let hasMore = true;
    let startCursor = undefined;
  
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: process.env.CLIENTS_DB_ID,
        page_size: 100,
        start_cursor: startCursor
      });
  
      const encontrado = response.results.find(c => c.id === idProcurado);
      if (encontrado) return encontrado;
  
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }
  
    return null; 
  }