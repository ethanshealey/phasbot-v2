import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default () => {
    const emf = new ButtonBuilder()
            .setCustomId('emf')
            .setLabel('EMF Level 5')
            .setStyle(ButtonStyle.Secondary);

        const ultra = new ButtonBuilder()
            .setCustomId('ultra')
            .setLabel('Ultraviolet')
            .setStyle(ButtonStyle.Secondary);

        const writing = new ButtonBuilder()
            .setCustomId('writing')
            .setLabel('Ghost Writing')
            .setStyle(ButtonStyle.Secondary);

        const freezing = new ButtonBuilder()
            .setCustomId('freezing')
            .setLabel('Freezing Temperatures')
            .setStyle(ButtonStyle.Secondary);

        const dots = new ButtonBuilder()
            .setCustomId('dots')
            .setLabel('D.O.T.S Projector')
            .setStyle(ButtonStyle.Secondary);

        const orb = new ButtonBuilder()
            .setCustomId('orb')
            .setLabel('Ghost Orb')
            .setStyle(ButtonStyle.Secondary);

        const box = new ButtonBuilder()
            .setCustomId('box')
            .setLabel('Spirit Box')
            .setStyle(ButtonStyle.Secondary);

        const row1 = new ActionRowBuilder()
			.addComponents(emf, ultra, writing, freezing, dots);

        const row2 = new ActionRowBuilder()
			.addComponents(orb, box);

        return [ row1, row2 ]
}