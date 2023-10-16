import { keyframes } from 'styled-components';

export const FadeIn = keyframes`
    0% {
        opacity: 0;
    }

    70% {
        opacity: 0.8;
    }

    100% {
        opacity: 1;
    }
`;

export const FadeOut = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.8;
    }

    100% {
        opacity: 0;
    }
`;

export const ZoomIn = keyframes`
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
`;

export const ZoomOut = keyframes`
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
`;
