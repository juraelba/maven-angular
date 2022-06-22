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
  accessToken: string;
}

export interface DecodedToken {
  exp: number;
}

export interface SuccessResponse {
  success: boolean;
}

export interface NextStepData {
  status: boolean;
  email: string;
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
