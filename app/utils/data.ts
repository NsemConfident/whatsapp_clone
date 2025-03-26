const topButtons = [
    {
        id: 1,
         name: "All",
         type: "all",
    },
    {
        id: 2,
         name: "Unread",
         type: "unread"
    },
    {
        id: 3,
         name: "Favourite",
         type: "favourite"
    },
    {
        id: 4,
         name: "Groups",
         type: "groups"
    }, 
    // {
    //     id: 5,
    //      name: "Lead"
    // },
    // {
    //     id: 6,
    //     name: "read"
    // }
 ]

const messageList = [
    {
        id: 1,
        profile: "group", 
        title: "Computer Vision and CyberSecurity",
        date: "yesterday",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "pin",
        isUnread: true,
        isGroup: true,
        isFavourite: true,
    },
    {
        id: 2,
        profile: "group", 
        title: "Computer Vision and CyberSecurity",
        created_at: "1/29/25",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "pin",
        isUnread: true,
        isGroup: false,
        isFavourite: true,
    },
    {
        id: 3,
        profile: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGVyfGVufDB8fDB8fHww", 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week',
        statusIcon: "muted",
        isUnread: false,
        isGroup: false,
        isFavourite: true,
    },
    {
        id: 4,
        profile: "https://ca.slack-edge.com/T05R6LXN7J8-U06R7GRBJSD-0bb90b6f36d1-512", 
        title: "Computer Vision and CyberSecurity",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
        isUnread: true,
        isGroup: false,
        isFavourite: false,
    },
    {
        id: 5,
        profile: "https://ca.slack-edge.com/T05R6LXN7J8-U07FRNSJ0PN-32469f3c0df8-512", 
        title: "Suzy",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
    },
    {
        id: 6,
        profile: "https://ca.slack-edge.com/T05R6LXN7J8-U07FGJV2HHC-541c5dc8f163-512", 
        title: "Njinda Salome",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
        isUnread: true,
        isGroup: false,
        isFavourite: true,
    },
    {
        id: 7,
        profile: "https://ca.slack-edge.com/T05R6LXN7J8-U06QUPJK1H9-f06d77514c73-512", 
        title: "MD Christien",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
        isUnread: true,
        isGroup: false,
        isFavourite: true,
    },
    {
        id: 8,
        profile: "https://ca.slack-edge.com/T05R6LXN7J8-U06QUPJK1H9-f06d77514c73-512", 
        title: "MD Christien",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
        isUnread: false,
        isGroup: false,
        isFavourite: true,
    },
    {
        id: 9,
        profile: "https://ca.slack-edge.com/T05R6LXN7J8-U06QUPJK1H9-f06d77514c73-512", 
        title: "MD Christien",
        date: "",
        message: 'you reacted 👍 to "No Java this week"',
        statusIcon: "muted",
        isUnread: true,
        isGroup: false,
        isFavourite: true,
    },
]


export default {messageList, topButtons};