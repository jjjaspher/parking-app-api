import { Request, Response } from "express";
import prisma from "../client";

// Get all Admins
export async function getAllAdmin(_req: Request, res: Response) {
  console.log('pumasok here getAllAdmin')
  try {
    console.log(_req.body);
    console.log(_req.params);
    console.log(_req.query);
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
}


export async function createAdmin(req: Request, res: Response): Promise<any> {
  try {
    console.log(req.body)
    const employeeID = req.body.employee_id;
    const existingAdmin = await prisma.admin.findFirst({
      where: { employee_id : employeeID}
    });
    console.log(existingAdmin)
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
  
}