import { REST, Routes, Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import dotenv from 'dotenv'
import generateGhosts from './helpers/generateGhosts.js';
import generateCursedPossessions from './helpers/generateCursedPossessions.js'
import generateJournalButtons from './helpers/generateJournalButtons.js'
import filterGhosts from './helpers/filterGhosts.js'
import getGhost from './helpers/getGhost.js'
import normalizeCursedPossession from './helpers/normalizeCursedPossession.js';
import getCursedPossession from './helpers/getCursedPossession.js';

dotenv.config()

const ghosts = await generateGhosts()
const cursedItems = await generateCursedPossessions()

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'journal',
    description: 'Creates a ghost hurting journal for you and your team to share!'
  },
  {
    name: 'ghosts',
    description: 'Gives a list of all the ghosts in Phasmophobia'
  },
  {
    name: 'cursed-possessions',
    description: 'Gives a list of all cursed possessions in Phasmophobia'
  },
  ...ghosts.map((g) => {
    return {
        name: g.name.toLowerCase().replaceAll(' ', '-'),
        description: `Gets details on ${g.name}`
    }
  }),
  ...cursedItems.map((c) => {
    return {
        name: c.name.toLowerCase().replaceAll(' ', '-'),
        description: `Gets details on ${c.name}`
    }
  })
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');
  await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async (interaction) => {
    if(interaction.isButton()) {

        const evidence = []
        const notEvidence = []

        interaction.message.components.forEach(async (row) => {
            row.components.forEach((b) => {
                if(b.data.custom_id === interaction.customId) {
                    if(b.data.style === ButtonStyle.Secondary) b.data.style = ButtonStyle.Success
                    else if(b.data.style === ButtonStyle.Success) b.data.style = ButtonStyle.Danger
                    else b.data.style = ButtonStyle.Secondary
                }

                if(b.data.style === ButtonStyle.Success) evidence.push(b.customId)
                else if(b.data.style === ButtonStyle.Danger) notEvidence.push(b.customId)
            })
        })

        const filtered = filterGhosts(ghosts, evidence, notEvidence)

        await interaction.update({
            content: `**Possible types:**\n${ filtered.length ? filtered.map((p) => p.name).join(', ') : '*None*' }\n**Evidence:**`,
            components: interaction.message.components
        })
    }
    else {
        const cmd = interaction.commandName
        if(cmd === 'ping') interaction.reply('Pong!')
        else if(cmd === 'journal') {
            interaction.reply({
                content: `**Possible Types**\n${ ghosts.map(g => g.name).join(', ') }\n**Evidence**\n`,
                components: [ ...generateJournalButtons() ]
            })
        }
        else if([ ...ghosts ].map((g) => g.name.toLowerCase().replaceAll(' ', '-')).includes(cmd)) {
            const ghost = await getGhost(cmd.replaceAll('-', ' '))
            interaction.reply({
                content: `**${ghost.name}**\n* ${ ghost.abilities.join('\n* ') }\n**Evidence**\n* ${ ghost.evidence.map(e => normalizeCursedPossession(e)).join('\n* ') }`
            })
        }
        else if([ ...cursedItems ].map((c) => c.name.toLowerCase().replaceAll(' ', '-')).includes(cmd)) {
            const item = await getCursedPossession(cmd.replaceAll('-', ' '))
            interaction.reply({
                content: `**${item.name}**\n${ item.description }\n**${ item.interactions.type }**\n* ${ item.interactions.interactions.join('\n* ') } }`
            })
        }
    }
})