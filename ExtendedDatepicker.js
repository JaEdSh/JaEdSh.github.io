import { css, html, LitElement, styleMap, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ExtendedDatePicker extends LitElement {


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
                value: {
                    type: 'string',
                    title: 'Default Value',
                    defaultValue: '08/27/2024'
                }
            },
            //Standard nwc control properties
            standardProperties: {
                fieldLabel: true,
                description: true,
                defaultValue: true,
                readOnly: true
            }
        }
    }

    constructor() {
        super();
    }

    // Render the UI as a function of component state
    render() {
        return html`<input id="datefield" class="nx-datetime-control" type="date" readonly="${this.readOnly}" value="${this.defaultValue}"></input>`
    }
}

// registering the web component.
const elementName = 'extended-datepicker';
customElements.define(elementName, ExtendedDatePicker);