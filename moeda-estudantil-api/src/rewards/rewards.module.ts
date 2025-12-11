import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TeachersModule } from '../teachers/teachers.module';
import { RewardsCronService } from './rewards-cron.service';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';

@Module({
  imports: [ScheduleModule.forRoot(), TeachersModule],
  controllers: [RewardsController],
  providers: [RewardsCronService, RewardsService],
  exports: [],
})
export class RewardsModule {}
