import { getRelatoriosFormatados } from './Notion/relatorios.js';
import { inserirRelatorios } from './db.js';

const run = async () => {
  const dados = await getRelatoriosFormatados();
  await inserirRelatorios(dados);
};

run();