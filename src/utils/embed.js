import {MessageEmbed} from "discord.js";

export class ErrorMessageEmbed extends MessageEmbed{
    constructor(type, message){
        super();

        this.setTitle("Error - " + type);
        this.setColor([255, 80, 80]);
        this.setDescription(message);
        this.setFooter("Zodia Island");
    }
}

export class DataMessageEmbed extends MessageEmbed{
    constructor(type, data){
        super();

        this.setTitle(type);
        this.setColor([80, 255, 80]);
        
        let msg = "";
        data.forEach(function(element){
            msg += "\n" + element.name + " : " + element.value;
        });
        this.setDescription(msg);

        this.setFooter("Zodia Island");
    }
}