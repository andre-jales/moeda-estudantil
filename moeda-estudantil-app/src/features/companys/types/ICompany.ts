export interface ICompany {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCompany {
  email: string;
  password: string;
  name: string;
  cnpj: string;
}
