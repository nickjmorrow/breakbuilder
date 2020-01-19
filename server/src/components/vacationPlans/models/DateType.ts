import { PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, Column, OneToMany } from 'typeorm';
import { VacationPlanDate } from './VacationPlanDate';

@Entity({ schema: 'bb', name: 'date_types' })
export class DateType {
	@PrimaryGeneratedColumn({ name: 'date_type_id' })
	dateTypeId!: number;

	@Column({ name: 'name' })
	name!: 'selected' | 'empty' | 'holiday';

	@OneToMany(type => VacationPlanDate, vacationPlanDate => vacationPlanDate.dateType)
	vacationPlanDate!: VacationPlanDate;
}
