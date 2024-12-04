import { Admin } from "../interfaces/admin.interface";
import { hashPassword } from "./password.service";

export const hashAdminPassword = async (reqAdminBody: Admin): Promise<Admin> => {
  const adminPassword = reqAdminBody.admin_password;
  const updatedReqAdminBody = {
    ...reqAdminBody,
    admin_password: await hashPassword(adminPassword)
  };
  
  return updatedReqAdminBody;
};