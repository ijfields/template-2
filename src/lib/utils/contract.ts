export const getBytecode = async (address: string): Promise<string> => {
  // Fetch contract bytecode from GUAPX network
  const response = await fetch(`https://api.guapx.io/v1/contracts/${address}/bytecode`);
  const data = await response.json();
  return data.bytecode;
};
