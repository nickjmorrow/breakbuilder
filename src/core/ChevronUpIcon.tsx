import React from 'react';
import { Svg } from '~/core/Svg';
import styled from 'styled-components';

export const ChevronUpIcon: React.FC<React.HTMLProps<HTMLOrSVGElement>> = props => {
    return (
        // @ts-ignore
        <CustomSvg {...props}>
            <path
                fill="currentColor"
                color="inherit"
                d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"
            />
        </CustomSvg>
    );
};

const CustomSvg = styled(Svg)`
    fill: ${p => p.theme.neutralColor.cs5};
    color: white;
    cursor: pointer;
`;
