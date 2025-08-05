const presencesArr = require("../../constants/presences.js")

function getRandomPresence(presences) {
  const rand = Math.floor(Math.random() * presences.length)
  return presences[rand]
}

module.exports = attachPresencePicker = (client) => {
  client.pickPresence = () => {
    const presence = getRandomPresence(presencesArr)

    client.user.setPresence({
      activities: [
        {
          name: presence.name,
          type: presence.type,
        },
      ],
      status: presence.status,
    })
  }
}
