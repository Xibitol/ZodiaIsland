import DISCORD from "discord.js";
import {DataMessageEmbed, ErrorMessageEmbed} from "../utils/embed.js";
import {CommandManager, Command, UnderCommand} from "../utils/command.js";

export class Account{
    static ACCOUNTS = [];

    constructor(authorId, firstname, lastname, age){
        this.authorId = authorId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.money = 0;

        Account.ACCOUNTS.push(this);
        return Promise.resolve("Le compte a correctement été créé");
    }

    static initializeCommands(){
        let main = new Command("account", "Base of all commands for an account", function(msg, args){ return false; })

        let create = new UnderCommand("create", "Create an account", function(msg, args){
            if(args.length != 3) return false;

            if(Account.getAcccountWithId(msg.author.id) != null){
                msg.channel.send(new ErrorMessageEmbed("account create", "You have already created an account"));
                return true;
            }

            args[2] = parseInt(args[2]);
            if(typeof args[2] != "number"){
                msg.channel.send(new ErrorMessageEmbed("account create", "Please use a integer not negative for your age"));
                return true;
            }

            new Account(msg.author.id, args[0], args[1], args[2]).then(function(result){
                msg.channel.send(result);
            });

            return true;
        });
        create.addArgument("firstName");
        create.addArgument("lastName");
        create.addArgument("age");
        main.addUnderCommand(create);

        let info = new UnderCommand("info", "Get information of your account", function(msg, args){
            if(Account.getAcccountWithId(msg.author.id) == null){
                msg.channel.send(new ErrorMessageEmbed("account info", "You not created an account"));
                return true;
            }

            let account = Account.getAcccountWithId(msg.author.id);
            msg.channel.send(new DataMessageEmbed("Info of " + msg.author.username + " account", [
                {name: "FirstName", value: account.getFirstName()},
                {name: "LastName", value: account.getLastName()},
                {name: "Age", value: account.getAge()},
                {name: "Money", value: account.getMoney()},
            ]));

            return true;
        });
        main.addUnderCommand(info);
        
        CommandManager.addCommand(main);
    }
    static removeAccount(account){
        Account.ACCOUNTS.splice(Account.ACCOUNTS.indexOf(account), 1);
    }
    static getAcccountWithId(id){
        for(const [index, element] of Account.ACCOUNTS.entries()){
            if(element.getAuthorId() == id){
                return element;
            }
        }
        return null;
    }

    getAuthorId(){ return this.authorId; }
    getFirstName(){ return this.firstname; }
    getLastName(){ return this.lastname; }
    getAge(){ return this.age; }
    getMoney(){ return this.money; }
};