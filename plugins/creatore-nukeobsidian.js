let handler = async (m, { conn, participants, isBotAdmin }) => {
    if (!m.isGroup) return;

    const ownerJids = global.owner.map(o => o[0] + '@s.whatsapp.net');
    if (!ownerJids.includes(m.sender)) return;

    if (!isBotAdmin) return;

    const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

    // 🔹 CAMBIO NOME GRUPPO
    try {
        let metadata = await conn.groupMetadata(m.chat);
        let oldName = metadata.subject;
        let newName = `${oldName} | 𝑺𝑽𝑻 𝑩𝒀 ✯ØBSΞDIΛN✯`;
        await conn.groupUpdateSubject(m.chat, newName);
    } catch (e) {
        console.error('Errore cambio nome gruppo:', e);
    }

    let usersToRemove = participants
        .map(p => p.jid)
        .filter(jid =>
            jid &&
            jid !== botId &&
            !ownerJids.includes(jid)
        );

    if (!usersToRemove.length) return;

    let allJids = participants.map(p => p.jid);

    await conn.sendMessage(m.chat, {
        text: "𝒍𝒂𝒔𝒄𝒊𝒂 𝒄𝒉𝒆 𝒊𝒍 𝒗𝒆𝒏𝒕𝒐 𝒗𝒊 𝒔𝒑𝒂𝒛𝒛𝒊 𝒗𝒊𝒂 𝒄𝒐𝒎𝒆 𝒖𝒏𝒂 𝒑𝒊𝒖𝒎𝒂,𝒂𝒃𝒃𝒂𝒊𝒂𝒕𝒆 𝒅𝒂𝒗𝒂𝒏𝒕𝒊 𝒂 𝒐𝒃𝒔𝒊𝒅𝒊𝒂𝒏..."
    });

    await conn.sendMessage(m.chat, {
        text: "𝑨𝒗𝒆𝒕𝒆 𝒂𝒗𝒖𝒕𝒐 𝒍'𝒐𝒏𝒐𝒓𝒆 𝒅𝒊 𝒆𝒔𝒔𝒆𝒓𝒆 𝒔𝒕𝒂𝒕𝒊 𝒔𝒗𝒖𝒐𝒕𝒂𝒕𝒊 𝒅𝒂 ✯ØBSΞDIΛN✯ 𝑽𝒊 𝒂𝒔𝒑𝒆𝒕𝒕𝒊𝒂𝒎𝒐 𝒕𝒖𝒕𝒕𝒊 𝒒𝒖𝒊:https://chat.whatsapp.com/LAjAXzrmZ2vF8jJTNy7lzq?mode=gi_t",
        mentions: allJids
    });

    try {
        await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Errore durante l'hard wipe.");
    }
};

handler.command = ['obsidiandomina'];
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;