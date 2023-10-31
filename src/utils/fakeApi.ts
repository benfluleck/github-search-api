export async function storeJSON({ key, data }: { key: string; data: unknown }) {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(key, stringifiedData);
}


export const fetchJSON = async({ key }: { key: string }): Promise<[]> => {
  const storedData = localStorage.getItem(key);
  const parsedData = storedData ? JSON.parse(storedData) : undefined;
  return parsedData as [];
}

