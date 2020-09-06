import { Typography } from '~/core/Typography';
import React from 'react';
import { SeasonalWeighting } from '~/calendar/components/SeasonalWeighting';
import { DateTypeComparison } from '~/calendar/components/DateTypeComparison';

export const Analytics: React.FC = () => {
    return (
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography colorVariant={'primaryLight'} style={{ display: 'block', marginBottom: '8px' }}>
                Analytics
            </Typography>
            <DateTypeComparison />
            <SeasonalWeighting style={{ marginTop: '24px' }} />
        </div>
    );
};