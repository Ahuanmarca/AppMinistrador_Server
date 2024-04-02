import prisma from "../config/prisma";

async function getAllProviders() {
  const allProviders = await prisma.providers.findMany();
  return allProviders;
}

export {
  getAllProviders,
}
