import {Directive, Attribute, OnInit} from 'angular2/core';
import {NgModel} from 'angular2/common';
 
@Directive({ 
    selector: '[mask]', 
    host: {
        '(keyup)' : 'onInputChange()'
    }
})
export class MaskDirective implements OnInit{
    maskPattern: string;
    placeHolderCounts:int;
    dividers: string[];
    modelValue: string;
    viewValue: string;
    
    constructor(public model:NgModel, @Attribute("mask")maskPattern: string){
        this.dividers = maskPattern.replace(/\*/g,"").split("");
        this.dividers.push(" ");
        this.generatePattern(maskPattern);
    }
    
    onInputChange(){
        this.modelValue = this.getModelValue();
        var stringToFormat = this.modelValue;
        
        this.viewValue = this.format(stringToFormat);
        this.viewValue = this.unpadString(this.viewValue);

        this.model.viewToModelUpdate(this.modelValue);
        this.model.valueAccessor.writeValue(this.viewValue)
    }
    
    generatePattern(patternString){
        this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
        for(var i = 0; i < this.placeHolderCounts; i++){
            patternString = patternString.replace('*',"{" + i + "}");
        }
        this.maskPattern = patternString;
    }
    
    format(s) {
        if(this.getModelValue().length == 0){
            return "";
        }
        var formattedString = this.maskPattern;
        
        var lastFormatt = formattedString.indexOf("{" + (this.getModelValue().length - 1) + "}");
        if(lastFormatt != -1){
            var pad = ("{" + (this.getModelValue().length - 1) + "}").length;
            formattedString = formattedString.substring(0, lastFormatt + pad);
        }
        
        for(var i = 0; i < this.getModelValue().length; i++){
            formattedString = formattedString.replace("{" + i + "}", s.charAt(i));
        }

        return formattedString;
    }
    
    unpadString(s){
        var lastChar = s.charAt(s.length - 1);
        if(lastChar == " "){
            return s.substring(0, s.length - 1);
        }
        return s;
    }
    
    getModelValue(){
        var modelValue = this.model.value;
        for(var i = 0; i < this.dividers.length; i++){
            while(modelValue.indexOf(this.dividers[i]) > -1){
                modelValue = modelValue.replace(this.dividers[i], "");
            }
        }
        return modelValue;
    }

    ngOnInit() {
        this.modelValue = this.model.value;
        if(this.modelValue != undefined){
            this.viewValue = this.format(this.modelValue);
            this.model.viewToModelUpdate(this.modelValue);
            this.model.valueAccessor.writeValue(this.viewValue);
        }
    }
}