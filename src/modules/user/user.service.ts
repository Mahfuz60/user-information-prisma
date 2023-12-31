import { PrismaClient, Profile, User } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDBUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });

  return result;
};

//!insert profile and update

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });

    return result;
  }

  const result = await prisma.profile.create({
    data,
  });

  return result;
};

//!Get Users

const getUsers = async () => {
  const result = await prisma.user.findMany({
    // select: {
    //   email: true,
    //   name:true
    // },

    include: {
      profile: true,
    },
  });

  return result;
};

//!get Single user

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  return result;
};

export const UserService = {
  insertIntoDBUser,
  insertOrUpdateProfile,
  getUsers,
  getSingleUser,
};
