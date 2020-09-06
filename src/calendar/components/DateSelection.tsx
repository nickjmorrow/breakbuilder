import React from 'react';
import { Calendar } from '~/calendar/components/Calendar';
import { Analytics } from '~/calendar/components/Analytics';

export const DateSelection: React.FC = () => {
    return (
        <div>
            <Calendar />
            <Analytics />
        </div>
    );
};
