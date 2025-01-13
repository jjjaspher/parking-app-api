import { Request, Response } from "express";
import { queryAllAdmins, queryAdminByAdminID, queryUpdateAdminByAdminID, queryCreateAdmin } from "../services/admin.service";
import { hashPasswordFromObject } from "../services/password.service";
import { Credentials } from '../interfaces/password.interface';
import { Admin } from "../interfaces/admin.interface";


const hashAdminPassword = async (reqAdminBody: Admin): Promise<Admin> => {
  const passwordCredentials: Credentials = {
    admin_password: reqAdminBody.admin_password
  };
  const hashedCredentials = await hashPasswordFromObject(passwordCredentials, 'admin_password');
  return { 
    ...reqAdminBody, 
    admin_password: hashedCredentials.admin_password 
  };
};

// Get all Admins
export async function getAllAdmin(_req: Request, res: Response) {
  try {
    const admins = await queryAllAdmins();
    res.json({
      status: true,
      message: "Admins Successfully fetched",
      data: admins,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
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
    res.status(400).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
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
    const admin = await queryCreateAdmin(adminReBody);

    res.status(201).json({
      status: true,
      message: "Admin Successfully Created",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
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

    const updatedAdmin = await queryUpdateAdminByAdminID(adminID, filteredBody);
    res.status(200).json({
      status: true,
      message: "Agent Successfully Updated",
      data: updatedAdmin
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
  };
}
