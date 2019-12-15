import * as React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@nickjmorrow/react-component-library';
import { AppState } from 'reduxUtilities/AppState';
import { SeasonalWeighting } from 'components/SeasonalWeighting';

const AnalyticsInternal: React.FC<ReturnType<typeof mapStateToProps>> = ({ selectedDates, connectedDates }) => {
	return (
		<div style={{ marginTop: '40px' }}>
			<Typography
				colorVariant={'primaryLight'}
				sizeVariant={4}
				weightVariant={7}
				style={{ display: 'block', marginBottom: '8px' }}
			>
				Analytics
			</Typography>
			<Typography colorVariant={'primaryLight'} style={{ display: 'block' }}>
				Selected Days: {selectedDates.length}
			</Typography>
			<Typography colorVariant={'primaryLight'} style={{ display: 'block' }}>
				Connected Days: {connectedDates.length}
			</Typography>
			<SeasonalWeighting style={{ marginTop: '24px' }} />
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	selectedDates: state.ui.selectedDates,
	connectedDates: state.ui.connectedDates,
});

export const Analytics = connect(mapStateToProps, null)(AnalyticsInternal);
