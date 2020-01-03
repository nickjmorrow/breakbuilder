const { readdirSync } = require('fs');

const getDirectories = source =>
	readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

const getModuleNameMappings = getDirectories('src').reduce((agg, cur) => {
	agg[`^${cur}/(.*)`] = `<rootDir>/src/${cur}/$1`;
	return agg;
}, {});

// console.log(getDirectories('src'));
module.exports = {
	transform: {
		'^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
	},
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
		'.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
		...getModuleNameMappings(),
	},
	testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
	transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
	globals: {
		__PATH_PREFIX__: ``,
	},
	testURL: `http://localhost`,
};
