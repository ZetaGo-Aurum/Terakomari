import fs from 'fs'

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)

  // Auto greeting WIB
  let hour = new Date().getHours() + 7
  if (hour >= 24) hour -= 24
  let greeting = 'Selamat malam'
  if (hour >= 4 && hour < 11) greeting = 'Selamat pagi'
  else if (hour >= 11 && hour < 15) greeting = 'Selamat siang'
  else if (hour >= 15 && hour < 18) greeting = 'Selamat sore'

  let caption = `
${greeting}, *${name}!*
Berikut informasi mengenai bot ini:

┏━━  *BOT INFORMATION*  ━━┓
┃ *⛩️Bot name:* Terakomari 
┃ *🌸Creator:* Allen
┃ *⚙️Version:* 1.0.0
┃ *📦Type:* Plugins ESM
┗━━━━━━━━━━━━━━━━━━━━┛

Silakan pilih menu di bawah atau ketik perintah langsung.
`.trim()

  // Kirim pesan dengan gambar & tombol
  await conn.sendMessage(m.chat, {
    image: fs.readFileSync('./media/ryo2.jpg'),
    caption,
    footer: '𝘵𝘦𝘳𝘢𝘬𝘰𝘮𝘢𝘳𝘪 - 𝘢𝘪',
    buttons: [
      { buttonId: '.allmenu', buttonText: { displayText: '🎀 All Menu' }, type: 1 },
      { buttonId: '.owner', buttonText: { displayText: '👤 Owner' }, type: 1 }, 
      { buttonId: '.sc', buttonText: { displayText: '📜 Script' }, type: 1 }
    ],
    headerType: 4,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: 'Terakomari gandesblood',
        body: 'Multifungsi',
        thumbnail: fs.readFileSync('./media/ryo1.jpg'),
        sourceUrl: 'https://github.com/ZetaGo-Aurum/Terakomari',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  // Kirim voice note lokal
  await conn.sendMessage(m.chat, {
    audio: fs.readFileSync('./media/tes2.mp3'),
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^menu$/i

export default handler