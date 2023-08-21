# phasbot
A Phasmaphobia Discord bot that enables your ghost hunting team to share a single journal!

![](https://i.imgur.com/UkU8b3z.png)

# How to use
First, clone the repo:

```git clone git@github.com:ethanshealey/phasbot.git```

Next, create a `.env` file with these contents:

```
DISCORD_TOKEN=###########################
DISCORD_CLIENT_ID=#######################
```

Populate these variables by creating a bot through Discord's [Developer Portal](https://discord.com/developers/applications), and add the bot to the desired channel

Run the bot:

```npm start```

Now, in Discord, you can prompt the bot with:

```/journal```

Now you and your team will have a shared journal!

# Commands

```/journal```
Creates a journal for your team to share

```/ghosts```
Lists all the ghosts in the game

```/<ghost>```
Gives info about a specific ghosts

```/cursed-possessions```
Lists all the cursed possessions in the game

```/<cursed-possession>```
Gives info about a specific cursed possession
