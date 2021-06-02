import DISCORD from "discord.js";
import {CommandManager, Command} from "./utils/command.js";
import {Account} from "./classes/account.js";


const CLIENT = new DISCORD.Client();
process.env.token = /*Token*/;

CLIENT.on("ready", function(){
    console.log("Bot launched");
});

new CommandManager(CLIENT, "?")
Account.initializeCommands();

CLIENT.login(process.env.token);
