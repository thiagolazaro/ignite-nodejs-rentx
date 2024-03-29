import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // Verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // Remove o arquivo do folder
  await fs.promises.unlink(filename);
};
