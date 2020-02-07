import { Typography } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import { SeasonalWeighting } from 'components/SeasonalWeighting';
import { DateTypeComparison } from 'components/DateTypeComparison';

export const Analytics: React.FC = () => {
	return (
		<div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
			<Typography
				colorVariant={'primaryLight'}
				sizeVariant={4}
				weightVariant={7}
				style={{ display: 'block', marginBottom: '8px' }}
			>
				Analytics
			</Typography>
			<DateTypeComparison />
			<SeasonalWeighting style={{ marginTop: '24px' }} />
		</div>
	);
};
