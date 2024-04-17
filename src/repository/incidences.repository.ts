import prisma from '../config/prisma';

async function getAllIncidences() {
  return await prisma.incidences.findMany();
}

async function createIncidence(incidence) {
  const newIncidence = await prisma.incidences.create({
    data: {
      title: incidence.title,
      description: incidence.description,
      image_url: incidence.image_url,
      user_dni: incidence.user_dni,
      building_id: Number(incidence.building_id),
      date: new Date(),
      time: new Date(),
      status: 'pendiente',
      category: incidence.category,
    }
  })

  return newIncidence;
}

async function updateStatus(id, status) {
  const updatedIncidence = await prisma.incidences.update({
    where: {
      id: Number(id)
    },
    data: {
      status: status
    }
  })

  return updatedIncidence;
}

export {
  getAllIncidences,
  createIncidence,
  updateStatus,
}
