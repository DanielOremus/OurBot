import { default as presencesArr } from "../../constants/presences.js"

function getRandomPresence(presences) {
  const rand = Math.floor(Math.random() * presences.length)
  return presences[rand]
}

export default function attachPresencePicker(client) {
  client.pickPresence = () => {
    const presence = getRandomPresence(presencesArr)

    // console.log("Setting presence:", presence)

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
