import { Request, Response } from "express";
import prisma from "../client";

// Get Admin by admin_id
const queryAdminByAdminID = async (adminID: string) => {
  const existingAdmin = await prisma.admin.findFirst({
    where: {
      admin_id: adminID
    }
  });
  if (existingAdmin) {
    return existingAdmin;
  }
  return null;
};

// Get all Admins
export async function getAllAdmin(_req: Request, res: Response) {
  console.log('getAllAdmin')
  try {
    const admins = await prisma.admin.findMany();
    console.log(admins)
    res.json({
      status: true,
      message: "Admins Successfully fetched",
      data: admins,
    });
    
  } catch (error) {
    console.log('may error', error)
  }
};

export async function getAdminByAdminID(req: Request, res: Response) {
  const adminID = req.query.adminID as string;
  if (!adminID) {
    res.status(400).json({
      status: false,
      message: 'Admin ID is required'
    });
  }

  try {
    const existingAdmin = await queryAdminByAdminID(adminID);
    if (!existingAdmin) {
      res.status(400).json({
        status: false,
        message: 'Admin not exist'
      });
    }
    res.json({
      status: true,
      message: "Admins Successfully fetched",
      data: existingAdmin,
    });
  } catch (error) {
    console.log('may error')
  }
}

export async function createAdmin(req: Request, res: Response): Promise<any> {
  try {
    console.log(req.body)
    const adminID = req.body.admin_id;
    const existingAdmin = await queryAdminByAdminID(adminID);
    if (existingAdmin) {
      res.status(400).json({
        status: false,
        message: 'Admin ID already exist'
      });
      return;
    }

    const admin = await prisma.admin.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: "Admin Successfully Created",
      data: admin,
    });
  } catch (error) {
    console.log('may error', error)
  }
};
