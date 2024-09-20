import app from './app';
import { config } from './config/dotenv';

const PORT = config.portExpress;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});