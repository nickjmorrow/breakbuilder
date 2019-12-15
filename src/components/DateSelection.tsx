import * as React from 'react';
import { Calendar } from 'components/Calendar';
import { ChevronUpIcon, TextInput, Button, Typography } from '@nickjmorrow/react-component-library';
import { Analytics } from 'components/Analytics';

export const DateSelection: React.FC = () => {
	const [availableDates, setAvailableDates] = React.useState('');

	return (
		<div style={{ minHeight: '100vh' }}>
			<div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div
					style={{
						border: '1px solid white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '43px',
						width: '40px',
						borderRadius: '40px',
						cursor: 'pointer',
					}}
				>
					<ChevronUpIcon colorVariant={'primaryLight'} sizeVariant={4} />
				</div>
			</div>
			<Calendar />
			<Analytics />
			<div style={{ marginTop: '40px' }}>
				<Typography colorVariant={'primaryLight'} sizeVariant={4} weightVariant={7}>
					Calculation Inputs
				</Typography>
				<TextInput
					placeholder={'Total Available Dates'}
					value={parseInt(availableDates, 10)}
					type={'number'}
					style={{ marginTop: '16px' }}
					onChange={e => setAvailableDates(e.currentTarget.value)}
				/>

				<Button colorVariant={'accent'} style={{ margin: '16px 0' }}>
					Calculate
				</Button>
			</div>
		</div>
	);
};
