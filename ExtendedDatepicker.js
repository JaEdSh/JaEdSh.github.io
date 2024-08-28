import { css, html, LitElement, styleMap, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { customElement, property } from 'lit/decorators.js';
import '@material/mwc-textfield/mwc-textfield.js';
import { TextField } from '@material/mwc-textfield/mwc-textfield.js';
import { styles } from './material-textfield.styles';

@customElement('form-plugin-datepicker')
export class ExtendedDatePicker extends LitElement {

    static styles = styles;

    /*@property()
    label!;
    @property()
    description!;
    @property({ type: Boolean })
    outlined;
    @property({ type: Boolean })
    readOnly;*/

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
                /*outlined: {
                    type: 'boolean',
                    title: 'Show Outline',
                  },*/
                value: {
                    type: 'string',
                    title: 'Default Value',
                    defaultValue: '08/27/2024'
                },
            },
            //Triggers an event that the Nintex form can handle
            standardProperties: {
                fieldLabel: true,
                description: true,
                defaultValue: true,
                readOnly: true
            }
        }
    }

    /*onChange(inputE) {
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
    }*/

    constructor() {
        super();
    }

    // Render the UI as a function of component state
    render() {
        return html`<input id="datefield" class="nx-datetime-control" type="date" readonly="${this.readOnly}" value="${this.defaultValue}">${this.value}</input>`
    }
}

// registering the web component.
const elementName = 'extended-datepicker';
customElements.define(elementName, ExtendedDatePicker);