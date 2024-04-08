import * as providersRepository from '../repository/providers.repository';

async function getAllProviders() {
  const allProviders = await providersRepository.getAllProviders();
  return allProviders;
}

export {
  getAllProviders,
}
