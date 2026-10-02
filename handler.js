module.exports.hello = async (event) => {
  const now = new Date();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        message: "Serverless Function executada com sucesso!",
        timestamp: now.toISOString(),
        horaLocal: now.toLocaleTimeString("pt-BR"),
        regiao: process.env.AWS_REGION || "Localhost (Ambiente Local)",
        ambiente: "Offline - Simulação Local",
      },
      null,
      2
    ),
  };
};