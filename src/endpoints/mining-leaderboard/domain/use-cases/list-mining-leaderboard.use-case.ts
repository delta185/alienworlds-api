import {
  ListLeaderboardQueryModel,
  MiningDailyLeaderboardRepository,
  MiningLeaderboard,
  MiningLeaderboardTimeframe,
  MiningMonthlyLeaderboardRepository,
  MiningWeeklyLeaderboardRepository,
} from '@alien-worlds/alienworlds-api-common';
import { Result, UseCase, inject, injectable } from '@alien-worlds/api-core';
import { ListMiningLeaderboardInput } from '../models/list-mining-leaderboard.input';

/**
 * @class
 */
@injectable()
export class ListMiningLeaderboardUseCase
  implements UseCase<MiningLeaderboard[]>
{
  public static Token = 'LIST_MINING_LEADERBOARD_USE_CASE';

  constructor(
    @inject(MiningDailyLeaderboardRepository.Token)
    private dailyLeaderboard: MiningDailyLeaderboardRepository,
    @inject(MiningWeeklyLeaderboardRepository.Token)
    private weeklyLeaderboard: MiningWeeklyLeaderboardRepository,
    @inject(MiningMonthlyLeaderboardRepository.Token)
    private monthlyLeaderboard: MiningMonthlyLeaderboardRepository
  ) {}

  /**
   * @async
   * @param {string} scanKey
   * @returns {Promise<Result<MiningLeaderboard[]>>}
   */
  public async execute(
    input: ListMiningLeaderboardInput
  ): Promise<Result<MiningLeaderboard[]>> {
    const { timeframe } = input;

    const model = ListLeaderboardQueryModel.create(input);

    switch (timeframe) {
      case MiningLeaderboardTimeframe.Daily: {
        return this.dailyLeaderboard.find(model);
      }
      //.....
    }
  }
}
