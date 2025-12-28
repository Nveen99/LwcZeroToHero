import { LightningElement, track } from 'lwc';

export default class DirectivesAndToggle extends LightningElement {
  @track showMessage = false;
  @track togggleText = false;
  @track togggleTextDy = false;
  handleToShow() {
    this.showMessage = true;
  }

  handleToHide() {
    this.showMessage = false;
  }

  // Toggle Standard
  handleToggle() {
    this.togggleText = !this.togggleText;
  }
  // getting from html and setting to js
  get handleLabel() {
    return this.togggleTextDy ? 'Hide text' : 'Show text';
  }

  handleToggleDynamic() {
    this.togggleTextDy = !this.togggleTextDy;
  }
}
