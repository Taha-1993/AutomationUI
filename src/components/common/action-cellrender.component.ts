// AddComponent
import { Component, OnDestroy, ElementRef } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { isIE } from '../../utils';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'action-cellrender',
    templateUrl: './action-cellrender.component.html',
})

export class ActionCellRenderComponent implements AgRendererComponent, OnDestroy {
    isEditor: any;
    originationEditor: any;
    servicingEditor: any;
    trusteeEditor: any;
    pricingEditor: any;
    submissionEditor: any;
    viewOnly: any;
    topPos = 0;

    private params: any;
    public data: any = null;

    constructor(private elRef: ElementRef) {
    }

    refresh(params): boolean {
        this.agInit(params);
        return true;
    }

    agInit(params: any): void {
        this.params = params;
        this.isEditor = this.params.context ? this.params.context.isEditor : false;
        this.viewOnly = this.params.context ? this.params.context.viewOnly : false;
        this.originationEditor = this.params.context ? this.params.context.originationEditor : false;
        this.servicingEditor = this.params.context ? this.params.context.servicingEditor : false;
        this.trusteeEditor = this.params.context ? this.params.context.trusteeEditor : false;
        this.pricingEditor = this.params.context ? this.params.context.pricingEditor : false;
        this.submissionEditor = this.params.context ? this.params.context.submissionEditor : false;
        if (this.params.data != null && !this.originationEditor && this.params.data.DataType === 'Origination') {
            if (this.params.context && this.params.context.hasOwnProperty('originationEditor')) {
                this.isEditor = false;
            }
        }
        if (this.params.data != null && !this.servicingEditor && this.params.data.DataType === 'Servicing') {
            if (this.params.context && this.params.context.hasOwnProperty('servicingEditor')) {
                this.isEditor = false;
            }
        }
        if (this.params.data != null && !this.trusteeEditor && this.params.data.DataType === 'Trustee Report') {
            if (this.params.context && this.params.context.hasOwnProperty('trusteeEditor')) {
                this.isEditor = false;
            }
        }
        if (this.params.data != null && !this.pricingEditor && this.params.data.DataType === 'Pricing') {
            if (this.params.context && this.params.context.hasOwnProperty('pricingEditor')) {
                this.isEditor = false;
            }
        }
        if (this.params.data != null && !this.submissionEditor && this.params.data.DataType === 'Submission') {
            if (this.params.context && this.params.context.hasOwnProperty('submissionEditor')) {
                this.isEditor = false;
            }
        }
        if (this.params.data != null && this.params.data.Status !== 1) {
            this.data = this.params.data;
        }
    }

    ngOnDestroy() {
    }

    getPositionTop(id) {
        if (!isIE()) {
            return '0 px';
        }
        if (this.params != null && this.params.eGridCell != null) {
            this.topPos = this.params.eGridCell.getBoundingClientRect().top;
            return (this.params.eGridCell.getBoundingClientRect().top + 3) + 'px';
        } else if (id !== '' && id != null) {
            const a = document.getElementById(id);
            const elPos: any = a.getBoundingClientRect();
            const topPos = (a.parentElement.parentElement.getBoundingClientRect().top + 3) + 'px';
            return topPos;
        }
    }
    getPositionLeft(id) {
        if (!isIE()) {
            return '0 px';
        }
        const element = document.getElementById(id);
        if (element) {
            return element.getBoundingClientRect().left + 'px';
        }
    }
}
