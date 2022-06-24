export interface Role {
  roleID: number;
  userID: number;
  name: string;
  recordToken: RecordToken;
}

export interface RecordToken {
  createdBy: number;
  createdDate: Date;
  createdByName: string;
  modifiedBy: number;
  modifiedDate: Date;
  modifiedByName: string;
  updatedBy: number;
  dirty: boolean;
  deleted: boolean;
}

export interface TokenResponse {
  token: string | null;
  status: string;
}

export interface DecodedToken {
  exp: number;
}

export interface SuccessResponse {
  success: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  office: string;
  title: string;
  phone: string;

  company: string;
  companyID: number;
  active: boolean;
  validated: boolean;
  lockedOut: boolean;
  expires: Date;
  roles: Role[];
  recordToken: RecordToken;
}

export class ChangePassword {
  token: string;
  password: string;
  constructor(token: string, password: string) {
    this.token = token;
    this.password = password;
  }
}

export class NextStepData {
  status: boolean;
  email: string;
  constructor(status: boolean, email: string) {
    this.status = status;
    this.email = email;
  }
}