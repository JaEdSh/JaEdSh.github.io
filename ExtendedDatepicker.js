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
                    isValueField: true,
                }
            },
            events: ["ntx-value-change"],
            //Standard nwc control properties
            standardProperties: {
                fieldLabel: true,
                description: true,
                defaultValue: true,
                readOnly: true
            }
        }
    }

    onChange(e) {
        this.value = e;
        if (this.EnableLog == true) { console.log(this.value); }
        const args = {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: e,
        };
        const event = new CustomEvent('ntx-value-change', args);
        this.dispatchEvent(event);
    }

    constructor() {
        super();
    }

    // Render the UI as a function of component state
    render() {
        if (this.readOnly){
            return html`<input id="datefield" class="nx-datetime-control" type="date" readonly value="${this.defaultValue}">${this.value}</input>`;
        }
        else {
            return html`<input id="datefield" class="nx-datetime-control" type="date" value="${this.defaultValue}">${this.value}</input>`;
        }
    }
}

// registering the web component.
const elementName = 'extended-datepicker';
customElements.define(elementName, ExtendedDatePicker);