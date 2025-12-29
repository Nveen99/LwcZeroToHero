import { LightningElement,api } from 'lwc';

export default class ChildComponentUsingAPI extends LightningElement {
    @api message="This is Child Component from JS";
}