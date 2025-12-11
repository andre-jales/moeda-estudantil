import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TeachersModule } from '../teachers/teachers.module';
import { RewardsCronService } from './rewards-cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), TeachersModule],
  providers: [RewardsCronService],
  exports: [],
})
export class RewardsModule {}
