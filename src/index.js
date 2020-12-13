import {AccountSystem, Account} from "./account/account.js";

import DISCORD from "discord.js";
const CLIENT = new DISCORD.Client();
process.env.token = "Nzg1MjA0NjY5NTEyODEwNTI3.X80c1Q.-l0qsvNqMb7sUH7VVtG81n4vZkc";

CLIENT.on("ready", function(){
    console.log("Bot launched");
});

new AccountSystem(CLIENT);

CLIENT.login(process.env.token);