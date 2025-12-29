import { LightningElement,api } from 'lwc';

export default class ChildComponentUsingAPI extends LightningElement {
    @api messageFromParent;
}