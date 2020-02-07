import * as React from 'react';
import { Calendar } from 'components/Calendar';
import { ChevronUpIcon } from '@nickjmorrow/react-component-library';
import { Analytics } from 'components/Analytics';

export const DateSelection: React.FC = ({}) => {
	return (
		<div style={{ minHeight: '100vh' }}>
			<div style={{ marginTop: '100px' }}>
				<Calendar />
			</div>
			<Analytics />
		</div>
	);
};
