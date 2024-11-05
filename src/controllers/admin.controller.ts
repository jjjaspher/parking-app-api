import { Request, Response } from "express";
import prisma from "../client";

// Get Admin by employee_id
const queryAdminByEmployeeID = async (employeeID: string) => {
  const existingAdmin = await prisma.admin.findFirst({
    where: { employee_id : employeeID}
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

export async function getAdminByEmployeeID(req: Request, res: Response) {
  const employeeID = req.query.employeeID as string;
  if (!employeeID) {
    res.status(400).json({
      status: false,
      message: 'Employee ID is required'
    });
  }

  try {
    const existingAdmin = await queryAdminByEmployeeID(employeeID);
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
    const employeeID = req.body.employee_id;
    const existingAdmin = await queryAdminByEmployeeID(employeeID);
    if (existingAdmin) {
      res.status(400).json({
        status: false,
        message: 'Admin employee ID already exist'
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
