class RangeInput extends HTMLElement {

    constructor(id) {
        super();

        // Get input
        this.input = document.getElementById(id);
        const parts = id.split('-');
        this.band = parts[1];
        this.type = parts[2];

        // Create container
        this.container = document.createElement('span');
        this.input.parentElement.appendChild(this.container);
        this.container.className = 'flex items-center';

        // Wrap in container
        this.container.appendChild(this.input);
        this.input.classList.add('flex-1');

        // Add value display
        this.display = document.createElement('span');
        this.container.appendChild(this.display);
        this.display.className = 'inline-block ml-2 w-8';

        // Bind methods
        this.change = this.change.bind(this);
        this.set = this.set.bind(this);

        // Add listeners
        this.input.addEventListener('input', this.change);

        // Set initial value
        this.change();
    }

    change(e) {
        // Parse value
        this.value = parseFloat(this.input.value);
        this.display.innerText = this.value;

        // Dispatch change event
        if (e) {
            const event = new CustomEvent('change', {
                detail: {
                    band: this.band,
                    type: this.type,
                    value: this.value,
                },
            })
            this.dispatchEvent(event);
        }
    }

    set(value) {
        this.input.value = value;
        this.change();
    }

}

customElements.define('range-input', RangeInput);
module.exports = RangeInput;