import { Request, Response } from "express";
import prisma from "../client";
import { hashAdminPassword } from "../services/admin.service";

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

export async function createAdmin(req: Request, res: Response) {
  try {
    const adminID = req.body.admin_id;
    const existingAdmin = await queryAdminByAdminID(adminID);
    if (existingAdmin) {
      res.status(400).json({
        status: false,
        message: 'Admin ID already exist'
      });
      return;
    }
    const adminReBody = await hashAdminPassword(req.body);
    const admin = await prisma.admin.create({
      data: adminReBody,
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

export async function updateAdmin(req: Request, res: Response) {
  try  {
    const adminID = req.body.admin_id;
    const existingAdmin = await queryAdminByAdminID(adminID);
    if (!existingAdmin) {
      res.status(400).json({
        status: false,
        message: 'Admin ID not exist'
      });
      return;
    }

    const filteredBody = Object.assign({}, req.body);
    delete filteredBody.admin_id;

    const updatedAdmin = await prisma.admin.update({
      where: {
        admin_id: adminID
      },
      data: filteredBody
    });
    res.status(200).json({
      status: true,
      message: "Agent Successfully Updated",
      data: updatedAdmin
    });


  } catch (err) {
    console.log(err)
  };
}
