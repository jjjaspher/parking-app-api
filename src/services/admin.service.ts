import prisma from "../client";
import { Admin } from "../interfaces/admin.interface";

// Get Admin by admin_id
export const queryAdminByAdminID = async (adminID: string) => {
  return await prisma.admin.findFirst({
    where: {
      admin_id: adminID
    }
  });
};

export async function queryAllAdmins() {
  return await prisma.admin.findMany();
};

// todo add, interface to the adminBody
export const queryUpdateAdminByAdminID = async (adminID: string, adminBody: any) => {
  return await prisma.admin.update({
    where: {
      admin_id: adminID
    },
    data: adminBody
  });
};

export const queryCreateAdmin = async (adminBody: Admin) => {
  return await prisma.admin.create({
    data: adminBody
  });
};