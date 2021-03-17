import socket from '../../socket';
import { RangeInput } from '../components';

const inputs = [
    new RangeInput('bands-low-max'),
    new RangeInput('bands-low-min'),
    new RangeInput('bands-low-multiply'),
    new RangeInput('bands-mid-max'),
    new RangeInput('bands-mid-min'),
    new RangeInput('bands-mid-multiply'),
    new RangeInput('bands-high-max'),
    new RangeInput('bands-high-min'),
    new RangeInput('bands-high-multiply'),
];

inputs.forEach(input => {
    input.addEventListener('change', handleChange);
});

socket.on('controls', (data) => {
    inputs.forEach(input => {
        const value = data.bands[input.band][input.type];
        input.set(value);
    });
});

function handleChange(e) {
    socket.emit('controls', {
        bands: {
            [e.detail.band]: {
                [e.detail.type]: e.detail.value,
            },
        },
    });
}