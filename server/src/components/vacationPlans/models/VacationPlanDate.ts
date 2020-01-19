import { PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import { VacationPlan } from './VacationPlan';
import { DateType } from './DateType';

@Entity({ schema: 'bb', name: 'vacation_plan_dates' })
export class VacationPlanDate {
	@PrimaryGeneratedColumn({ name: 'vacation_plan_date_id' })
	vacationPlanDateId!: number;

	@Column({ name: 'calendar_date' })
	calendarDate!: Date;

	@ManyToOne(
		type => VacationPlan,
		vacationPlan => vacationPlan.vacationPlanDates,
	)
	@JoinColumn({ name: 'vacation_plan_id' })
	vacationPlan!: VacationPlan;

	@ManyToOne(
		type => DateType,
		dateType => dateType.vacationPlanDate,
	)
	@JoinColumn({ name: 'date_type_id' })
	dateType!: DateType;
}
