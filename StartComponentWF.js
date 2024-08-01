import { css, html, LitElement, styleMap, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class EmbeddedWorkflowStart extends LitElement {


    static get properties() {
        return {
            startRun: { type: Boolean },
            value: { type: String }
          };
    }

    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'Start Workflow',
            fallbackDisableSubmit: false,
            description: 'Connects to the Nintex API to start a workflow',
            iconUrl: "one-line-text",
            groupName: 'Custom Controls',
            version: '1.4',
            //This holds all the parameters that are entered into the control.
            properties: {
                workflowID: {
                    type: 'string',
                    title: 'Workflow ID'
                },
                startRun: {
                    type: 'boolean',
                    title: 'Execute Event',
                    defaultValue: false,
                },
                nintexAPIURL: {
                    type: 'string',
                    title: 'Nintex API workflow Endpoint URL',
                    description: 'https://us.nintex.io/workflows/v1/designs/',
                    required: ['true']
                },
                nintexAPIKey: {
                    type: 'string',
                    title: 'API Key',
                    required: ['true']
                },
                userEmail: {
                    type: 'string',
                    title: 'User email'
                },
                userType: {
                    type: 'string',
                    title: 'User Type'
                },
                phoneNumber: {
                    type: 'string',
                    title: 'User phone number'
                },
                userTitle: {
                    type: 'string',
                    title: 'User Title'
                },
                departmentIDsOriginal: {
                    type: 'string',
                    title: 'Department IDs original'
                },
                departmentIDsNew: {
                    type: 'string',
                    title: 'Department IDs edited'
                },
                organizationID: {
                    type: 'number',
                    title: 'Organization ID'
                },
                userPronounsOrig: {
                    type: 'string',
                    title: 'User Pronouns'
                },
                userPronounsNew: {
                    type: 'string',
                    title: 'New Pronouns'
                },
                userName: {
                    type: 'string',
                    title: 'User Name'
                },
                prefix: {
                    type: 'string',
                    title: "User Prefix"
                },
                tier: {
                    type: 'string',
                    title: 'Program Tier'
                },
                originalTier: {
                    type: 'string',
                    title: 'Currently saved tier'
                },
                schedule: {
                    type: 'string',
                    title: 'Program Schedule'
                },
                originalSchedule: {
                    type: 'string',
                    title: 'Currently saved schedule'
                },
                outcomeSel: {
                    type: 'boolean',
                    title: 'Outcome SEL'
                },
                outcomeTransitions: {
                    type: 'boolean',
                    title: 'Outcome Transitions'
                },
                outcomeNumeracy: {
                    type: 'boolean',
                    title: 'Outcome Numeracy'
                },
                outcomeLiteracy: {
                    type: 'boolean',
                    title: 'Outcome Literacy'
                },
                pillarHealth: {
                    type: 'boolean',
                    title: 'Pillar Health and wellness'
                },
                pillarCollege: {
                    type: 'boolean',
                    title: 'Pillar College'
                },
                pillarAdultdev: {
                    type: 'boolean',
                    title: 'Pillar Adult Development'
                },
                pillarFamily: {
                    type: 'boolean',
                    title: 'Pillar Family Engagement'
                },
                programType: {
                    type: 'string',
                    title: 'Program Type'
                },
                programID: {
                    type: 'string',
                    title: 'Program ID'
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
    //Only start the API request if the startRun (Execute Event on the form) has been set to true
    updated(changedProperties) {
        if (changedProperties.has('startRun')) {
            console.log(changedProperties);
            //Only runs if form control is true
            if (this.startRun != null) {
                console.log("this run " + this.startRun);
                if (this.startRun == true) {
                    console.log("executing");
                    this.load();
                }
            }
        }
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

    async load() {
        //Create the body for starting the workflow

        const submitBody = {
            "startData": {
                "se_programtype": this.programType,
                "se_pillarfamily": this.pillarFamily,
                "se_tier": this.tier,
                "se_originaltier": this.originalTier,
                "se_schedule": this.schedule,
                "se_originalschedule": this.originalSchedule,
                "se_outcomesel": this.outcomeSel,
                "se_outcometransitions": this.outcomeTransitions,
                "se_outcomenumeracy": this.outcomeNumeracy,
                "se_outcomeliteracy": this.outcomeLiteracy,
                "se_pillarhealth": this.pillarHealth,
                "se_pillarcollege": this.pillarCollege,
                "se_pillaradultdev": this.pillarAdultdev,
                "se_programid": this.se_programid,
                "se_prefix": this.prefix,
                "se_pronounsnew": this.userPronounsNew,
                "se_departmentidsoriginal": this.departmentIDsOriginal,
                "se_pronouns1": this.userPronounsOrig,
                "se_departmentids1": this.departmentIDsNew,
                "se_useremail": this.userEmail,
                "se_usertype": this.userType,
                "se_phonenumber": this.phoneNumber,
                "se_usertitle": this.userTitle,
                "se_organizationid": this.organizationID,
                "se_username": this.userName
            }
        }

        console.log(submitBody);
        //Start the workflow
        const submit = await fetch(this.nintexAPIURL + this.workflowID + '/instances?token=' + this.nintexAPIKey,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitBody)
            });
        //Wait for api response
        const jsonSubmit = await submit.json();
        console.log(jsonSubmit);
        this.onChange(jsonSubmit.id);
    }

    constructor() {
        super();
    }



    // Render the UI as a function of component state
    render() {
        return html`<mwc-textfield id="textfield">${this.value}</mwc-textfield>`
    }
}

// registering the web component.
const elementName = 'start-component-workflow';
customElements.define(elementName, EmbeddedWorkflowStart);