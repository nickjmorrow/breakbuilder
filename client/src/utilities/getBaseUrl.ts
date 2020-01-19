const developmentUrl = 'http://localhost:3001';
const productionUrl = '';

export const getBaseUrl = () => {
	const env = process.env.NODE_ENV;
	return env === 'development' ? developmentUrl : productionUrl;
};
