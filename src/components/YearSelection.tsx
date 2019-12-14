import React from 'react';
import { Select, Button } from '@nickjmorrow/react-component-library';

export const YearSelection: React.FC = () => {
	const options = [2017, 2018, 2019].map(n => ({
		value: n,
		label: n.toString(),
	}));
	const [currentOption, setCurrentOption] = React.useState(options.find(o => o.value === new Date().getFullYear())!);
	return (
		<div style={{ height: '100vh' }}>
			<div style={{ height: '300px' }} />
			<Select
				options={options}
				currentOption={currentOption}
				onChange={setCurrentOption}
				styleApi={{
					currentOptionTypography: {
						color: 'white',
						fontSize: '24px',
					},
					optionsList: {
						borderRadius: '8px',
					},
					currentOption: {
						borderBottomColor: 'white',
					},
				}}
			/>
			<Button style={{ marginTop: '300px' }}>Confirm</Button>
		</div>
	);
};
