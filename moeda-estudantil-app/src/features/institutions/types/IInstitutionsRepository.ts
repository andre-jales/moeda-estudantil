import type {
  IGetInstitutionsParams,
  IInstitution,
  INewInstitution,
  IUpdatedInstitution,
} from "./IInstitution";

export interface IInstitutionsRepository {
  getAllInstitutions(params: IGetInstitutionsParams): Promise<IInstitution[]>;
  getInstitutionById(id: string): Promise<IInstitution | null>;
  createInstitution(institution: INewInstitution): Promise<IInstitution>;
  updateInstitution(
    institution: IUpdatedInstitution
  ): Promise<IInstitution | null>;
}
