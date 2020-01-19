import { Entity, OneToMany, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { VacationPlanDate } from './VacationPlanDate';

@Entity({ schema: 'bb', name: 'vacation_plans' })
export class VacationPlan {
	@PrimaryColumn({ name: 'vacation_plan_id' })
	vacationPlanId!: number;

	@Column({ name: 'url' })
	url!: string;

	@OneToMany(
		type => VacationPlanDate,
		vacationPlanDate => vacationPlanDate.vacationPlan,
	)
	@JoinColumn({ name: 'vacation_plan_date_id' })
	vacationPlanDates!: VacationPlanDate[];
}
