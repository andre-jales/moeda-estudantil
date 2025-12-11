import type {
  IBaseSuccessResponse,
  IDonateCoinsPayload,
  IInstitutionStudent,
  IRedeemRewardPayload,
  IReward,
  ITransaction,
} from "./IReward";

export interface IRewardsRepository {
  donateCoins(payload: IDonateCoinsPayload): Promise<IBaseSuccessResponse>;
  getTransactions(): Promise<ITransaction[]>;
  redeemReward(payload: IRedeemRewardPayload): Promise<IBaseSuccessResponse>;
  getAvailableRewards(): Promise<IReward[]>;
  getInstitutionStudents(): Promise<IInstitutionStudent[]>;
}

