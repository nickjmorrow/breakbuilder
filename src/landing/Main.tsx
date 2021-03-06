import React from 'react';
import styled, { keyframes } from 'styled-components';
import { GithubIcon } from '@nickjmorrow/react-component-library';
import { DateSelection } from '~/calendar/components/DateSelection';

export const Main: React.FC = () => {
    return (
        <Wrapper>
            <div
                style={{
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '32px',
                }}
            >
                <DateSelection />
            </div>
            <a href="https://github.com/nickjmorrow/breakbuilder" target="_blank" rel="noopener noreferrer">
                <GithubIcon
                    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                    colorVariant={'secondaryLight'}
                />
            </a>
        </Wrapper>
    );
};

const animate = keyframes`
  to {
    background-position: 50% 50%;
  }
`;

const Wrapper = styled('div')`
    min-height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    animation: ${animate} 5s infinite alternate;
    background: radial-gradient(circle at top left, hsla(334, 100%, 50%, 0.4) 10%, transparent 80%) 100% 100%/200% 200%,
        radial-gradient(circle at bottom left, #6a00ff 30%, transparent 80%) 100% 100%/200% 200%,
        radial-gradient(circle at top right, hsla(232, 90%, 61%, 0.7) 30%, transparent 60%) 100% 100%/200% 200%,
        radial-gradient(circle at 75% 75%, hsla(155, 90%, 61%, 0.7) 10%, transparent 90%) 100% 100%/200% 200%,
        radial-gradient(circle at 50% 50%, #ffd900 70%, transparent 100%) 100% 100%/200% 200%;
`;
