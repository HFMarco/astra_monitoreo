const mssql = require('mssql');
const fetch = require('node-fetch');
const { parseM3U } = require('../utils/m3uParser');
const { sendTelegramNotification } = require('../services/telegramService');

// Configuración de la base de datos
const config = {
  user: 'your-db-user',
  password: 'your-db-password',
  server: 'your-db-server',
  database: 'your-db-name',
};

// Función para obtener el estado de los streams
exports.getStreamStatus = async () => {
  // Leer archivo M3U
  const m3uUrl = 'path-to-your-m3u-file';
  const response = await fetch(m3uUrl);
  const m3uContent = await response.text();
  const streams = parseM3U(m3uContent);

  // Verificar estado de los streams
  for (let stream of streams) {
    try {
      const res = await fetch(stream.url);
      if (!res.ok) {
        // Enviar notificación si el stream está caído
        sendTelegramNotification(`Stream ${stream.name} está caído.`);
        // Log en la base de datos
        await logStreamStatus(stream.name, 'CAÍDO');
      } else {
        await logStreamStatus(stream.name, 'ACTIVO');
      }
    } catch (error) {
      sendTelegramNotification(`Stream ${stream.name} está caído.`);
      await logStreamStatus(stream.name, 'CAÍDO');
    }
  }

  return streams;
};

// Función para obtener logs
exports.getLogs = async () => {
  // Lógica para obtener logs de la base de datos
};
