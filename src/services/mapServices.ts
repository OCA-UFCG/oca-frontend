export async function fetchMapURL(id: string, year: string, body: BodyInit) {
  try {
    const response = await fetch(`/api/ee?name=${id}&year=${year}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar fontes de mapa.", error);

    return {};
  }
}
