import * as React from 'react';
import { Calendar } from 'components/Calendar';
import { ChevronUpIcon } from '@nickjmorrow/react-component-library';

export const DateSelection: React.FC = () => {
	return (
		<div style={{ height: '100vh' }}>
			<div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '43px', width: '40px', borderRadius: '40px', cursor: 'pointer'}}><ChevronUpIcon colorVariant={'primaryLight'} sizeVariant={4} /></div>
			</div>
			<Calendar />
		</div>
	);
};
