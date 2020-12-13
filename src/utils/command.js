export class CommandSystem{
    constructor(client){
        this.prefix = "?";
        this.commands = new Array();

        client.on("message", function(message){
            if(!message.content.startsWith(this.prefix)) return;
            let messageArray = message.content.split(" ");
            messageArray[0].replace("?", "");

            this.commands.forEach(function(command){
                if(messageArray[0] != command.name) return

                command.underCommand.forEach(function(underCommand){
                    if(messageArray[0] != underCommand.name) return;

                    
                }).then(function(){

                })
            });
        });
    }
    addCommand(command){
        this.commands.push(command);
    }
}
export class Command{
    constructor(name){
        this.name = name
        this.arguments = new Array();
        this.underCommand = new Array();
    }

    addArgument(name, required){
        this.arguments.push({name, required});
    }
    addUnderCommand(underCommand){
        this.underCommand.push(underCommand);
    }
}
export class UnderCommand{
    constructor(name){
        this.name = name
        this.arguments = new Array();
    }

    addArgument(name, required){
        this.arguments.push({name, required});
    }
}