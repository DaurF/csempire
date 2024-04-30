const {Server} = require('socket.io')
const {v4: uuidv4} = require('uuid')

const io = new Server(3000, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
  }
})

const messageList = []
const users = {}
let bets = {}

const rolls = []
let rollId = 1

let rolling = false

let rolltime = new Date().getTime() + 220000

setInterval(() => {
  const randNum = Math.floor(Math.random() * 15 + 1)
  const winnings = {}

  let winside = ''

  if (randNum === 15) {
    winside = 'bonus'
    for (const [userId, userBets] of Object.entries(bets)) {
      if (!winnings.hasOwnProperty(userId)) {
        winnings[userId] = 0
      }

      for (const bet of userBets) {
        if (bet.side === 'bonus') {
          winnings[userId] += bet.amount * 14;
        }
      }
    }
  }

  if (randNum % 2 === 1 && randNum !== 15) {
    winside = 'ct'
    for (const [userId, userBets] of Object.entries(bets)) {
      if (!winnings.hasOwnProperty(userId)) {
        winnings[userId] = 0
      }

      for (const bet of userBets) {
        if (bet.side === 'ct') {
          winnings[userId] += bet.amount * 2;
        }
      }
    }
  }

  if (randNum % 2 === 0) {
    winside = 't'
    for (const [userId, userBets] of Object.entries(bets)) {
      if (!winnings.hasOwnProperty(userId)) {
        winnings[userId] = 0
      }

      for (const bet of userBets) {
        if (bet.side === 't') {
          winnings[userId] += bet.amount * 2;
        }
      }
    }
  }


  for (const id of Object.keys(winnings)) {
    users[id].balance += winnings[id]
  }

  bets = {}
  const roll = {id: rollId++, side: winside, num: randNum}
  rolls.push(roll)

  rolltime = new Date().getTime() + 23500
  io.emit('roll-end', roll, randNum, winnings)
  rolling = {side: winside}
  setTimeout(() => {
    rolling = false;
  }, 5000)
}, 23500)

io.on('connection', (socket) => {

  const user = {
    username: socket.id,
    balance: 100,
    level: 90,
    avatar: 'https://dthezntil550i.cloudfront.net/rj/latest/rj1803311338471190005439374/1280_960/0d505b63-3e67-44dd-a510-862c245ee1b9.png'
  }

  users[socket.id] = user

  const initObj = {
    messages: messageList,
    user,
    rolls,
  }

  if (rolling) {
    initObj['rolling'] = {...rolling, secondsLeft: 5000 + rolltime - new Date().getTime() - 23500}
  }

  io.emit('init', initObj)


  socket.on('bet', (user, info) => {
    if (info.amount > users[socket.id]) {
      return
    }

    const betInfo = {user, ...info}

    if (!bets[socket.id]) {
      bets[socket.id] = []
    }

    bets[socket.id].push(betInfo)
    users[socket.id].balance -= info.amount;

    io.emit('made-bet', betInfo)
  })

  socket.on('send-message', (user, content, locale) => {
    const id = uuidv4();
    const message = {
      id,
      user,
      content,
      locale
    }
    messageList.push(message);
    io.emit('receive-message', message)
  })
})
