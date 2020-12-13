import DISCORD from "discord.js";

export class AccountSystem{
    constructor(client){
        this.accounts = new Array();

        client.on("guildMemberAdd", function(member){
            console.log("Test")
            let channel = client.channels.cache.get("785210025123643403");
            channel.send("Bienvenue sur notre île, @" + member.displayName + ".\nCommence par créer un profil pour démarrer ton aventure !");
        });
    }

    addAccount(account){
        this.accounts.push(account);
    }
    removeAccount(account){
        this.accounts.splice(this.accounts.indexOf(account), 1);
    }
};

export class Account{
    constructor(firstname, lastname, age){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;

        return Promise.resolve("Le compte à correctement été créé");
    }
};