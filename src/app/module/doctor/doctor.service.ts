import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctor } from "./doctor.interface";

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      specialties: {
        // include: {
        //   specialty: true,
        // },
        select: {
          specialty: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
  return doctors;
};

// const getAllDoctors = async () => {
//   const result = await prisma.doctor.findMany({
//     where: {
//       isDeleted: false,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       profilePhoto: true,
//       contactNumber: true,
//       registrationNumber: true,
//       experience: true,
//       gender: true,
//       appointmentFee: true,
//       qualification: true,
//       currentWorkingPlace: true,
//       designation: true,
//       averageRating: true,
//       createdAt: true,
//       updatedAt: true,
//       specialties: {
//         select: {
//           specialty: {
//             select: {
//               id: true,
//               title: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   // Transform specialties (flatten structure)
//   const doctors = result.map((doctor) => ({
//     ...doctor,
//     specialties: doctor.specialties.map((s) => s.specialty),
//   }));

//   return doctors;
// };

const getDoctorById = async (doctorId: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId,
      isDeleted: false,
    },
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new Error("Doctor not found.");
  }

  const specialties = doctor.specialties.map((s) => s.specialty);

  const doctorDetails = { ...doctor, specialties };

  return doctorDetails;
};

const updateDoctor = async (doctorId: string, payload: IUpdateDoctor) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: {
      id: doctorId,
      // isDeleted: false,
    },
  });
  if (!isDoctorExist) {
    throw new AppError(status.NOT_FOUND, "Doctor not found.");
  }

  const { doctor: doctorData, specialties } = payload;

  await prisma.$transaction(async (tx) => {
    if (doctorData) {
      await tx.doctor.update({
        where: {
          id: doctorId,
        },
        data: {
          ...doctorData,
        },
      });
    }

    if (specialties && specialties.length > 0) {
      for (const specialty of specialties) {
        const { specialtyId };
      }
    }
  });

  const specialtiesData = specialties.map((specialtyId) => ({
    doctorId,
    specialtyId,
  }));
  await prisma.doctorSpecialty.createMany({
    data: specialtiesData,
  });

  const result = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: {
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  return {
    ...result,
    specialties: result?.specialties.map((s) => s.specialty) || [],
  };
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
};
