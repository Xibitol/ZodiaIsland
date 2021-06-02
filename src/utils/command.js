import {MessageEmbed} from "discord.js";

export class CommandManager{
    static COMMANDS = [];

    constructor(client, prefix){
        client.on("message", function(msg){
            if(!msg.content.startsWith(prefix)) return;
            let msgArray = msg.content.split(" ");
            msgArray[0] = msgArray[0].substring(1);

            CommandManager.COMMANDS.forEach(function(cmd){
                if(msgArray[0] != cmd.name) return;

                for(const [index, underCmd] of cmd.getUnderCommands().entries()) {
                    if(msgArray[1] != underCmd.name) {
                        if(index == cmd.getUnderCommands().length-1){
                            msgArray.shift();

                            if(!cmd.execute(msg, msgArray)){
                                let embed = new MessageEmbed();
                                embed.setTitle("Help - " + cmd.name);
                                embed.setColor([80, 80, 255]);
                                embed.setDescription(cmd.description);
                                
                                let string = "?" + cmd.name;
                                cmd.getArguments().forEach(function(element){
                                    string += " <" + element + ">";
                                });
                                embed.addField("Syntaxe", string)

                                embed.setFooter("Zodia Island");

                                msg.channel.send(embed);
                            }
                        }

                        continue;
                    }

                    msgArray.shift();
                    msgArray.shift();

                    if(!underCmd.execute(msg, msgArray)){
                        let embed = new MessageEmbed();
                        embed.setTitle("Help - " + cmd.name + " " + underCmd.name);
                        embed.setColor([80, 80, 255]);
                        embed.setDescription(underCmd.description);
                        
                        let string = "?" + cmd.name + " " + underCmd.name;
                        underCmd.getArguments().forEach(function(element){
                            string += " <" + element + ">";
                        });
                        embed.addField("Syntaxe", string)

                        embed.setFooter("Zodia Island");

                        msg.channel.send(embed);
                    }

                    break;
                }
            });
        });
    }
    static addCommand(command){
        this.COMMANDS.push(command);
    }
}
export class Command{
    constructor(name, description, execute){
        this.name = name;
        this.description = description;
        this.arguments = [];
        this.underCommands = [];
        this.execute = execute;
    }

    addArgument(name){
        this.arguments.push(name);
    }
    addUnderCommand(underCommand){
        this.underCommands.push(underCommand);
    }

    getName(){ return this.name; }
    getDescription(){ return this.description; }
    getArguments(){ return this.arguments; }
    getUnderCommands(){ return this.underCommands; }
}
export class UnderCommand{
    constructor(name, description, execute){
        this.name = name
        this.description = description;
        this.arguments = [];
        this.execute = execute;
    }

    addArgument(name){
        this.arguments.push(name);
    }

    getName(){ return this.name; }
    getDescription(){ return this.description; }
    getArguments(){ return this.arguments; }
}