import { css, html, LitElement, styleMap, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ExtendedDatePicker extends LitElement {


    static get properties() {
        return {
            value: { type: String }
          };
    }

    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'Extended Datepicker',
            fallbackDisableSubmit: false,
            description: 'A datepicker that allows the user to enter a value',
            iconUrl: "one-line-text",
            groupName: 'Custom Controls',
            version: '1.4',
            //This holds all the parameters that are entered into the control.
            properties: {
                default: {
                    type: 'string',
                    title: 'Default Value'
                },
                value: {
                    type: 'string',
                    title: 'Value',
                    isValueField: true
                }
            },
            //Triggers an event that the Nintex form can handle
            events: ["ntx-value-change"]

        };
    }

    onChange(inputE) {
        if (this.startRun != null) {
            this.value = inputE;
            console.log(this.value);
            const args = {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail: inputE,
            };
            const event = new CustomEvent('ntx-value-change', args);
            this.dispatchEvent(event);
        }
    }

    // Render the UI as a function of component state
    render() {
        return html`<mwc-textfield id="datefield" type="date" onChange="onChange(${this.value})">${this.value}</mwc-textfield>`
    }
}

// registering the web component.
const elementName = 'extended-datepicker';
customElements.define(elementName, ExtendedDatePicker);