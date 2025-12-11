import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TeachersModule } from '../teachers/teachers.module';
import { RewardsCronService } from './rewards-cron.service';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { EmailService } from 'src/email/email.service';
import { RewardsEmailService } from './rewards-email.service';

@Module({
  imports: [ScheduleModule.forRoot(), TeachersModule, EmailService],
  controllers: [RewardsController],
  providers: [RewardsCronService, RewardsService, RewardsEmailService],
  exports: [],
})
export class RewardsModule {}
