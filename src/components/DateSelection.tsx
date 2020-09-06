import * as React from 'react';
import { Calendar } from 'components/Calendar';
import { Analytics } from 'components/Analytics';

export const DateSelection: React.FC = () => {
	return (
		<div>
			<Calendar />
			<Analytics />
		</div>
	);
};