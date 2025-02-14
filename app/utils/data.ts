const topButtons = [
    {
        id: 1,
         name: "All"
    },
    {
        id: 2,
         name: "Unread"
    },
    {
        id: 3,
         name: "Favourite"
    },
    {
        id: 4,
         name: "Groups"
    }, 
    {
        id: 5,
         name: "Lead"
    },
    {
        id: 6,
        name: "read"
    }
 ]

const messageList = [
    {
        id: 1,
        profile: {uri: "group"}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 2,
        profile: {uri: "group"}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 3,
        profile: {uri: "data:image/jpeg;base64,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"}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 4,
        profile: {uri: ""}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 5,
        profile: {uri: ""}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 6,
        profile: {uri: ""}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 1,
        profile: {uri: ""}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 7,
        profile: {uri: ""}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 8,
        profile: {uri: ""}, 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "pin",
    },
]


export default {messageList, topButtons};