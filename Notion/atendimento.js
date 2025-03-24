import { notion } from './notion.js';

getAtendimentos();

export async function getAtendimentos() {
  const response = await notion.databases.query({
    database_id: process.env.ATENDIMENTOS_DB_ID
  });
  console.log(response.results[2].properties.Paciente);

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
