export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
    { value: 'sports', label: 'Sports', color: '#00B8D9' },
    { value: 'entertainment', label: 'Entertainment', color: '#0052CC' },
    { value: 'politics', label: 'Politics', color: '#5243AA' },
    { value: 'literature', label: 'Literature', color: '#FF5630' },
    { value: 'international', label: 'International', color: '#FF8B00' },
    { value: 'business', label: 'Business', color: '#FFC400' },
    { value: 'advertise', label: 'Advertise', color: '#36B37E' },
];