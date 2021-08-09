module.exports = {

  // const sTT = [
  //       'o.help | fun stuff',
  //       'o.help | join with us!',
  //       'o.help | sleep in the day',
  //       'o.help | play owlvernyte',
  //       'o.help | congratss! ',
  //     ]

  // const rSTT = sTT[Math.floor(Math.random() * sTT.length)]
  
  discord: {
    botid: process.env.BOT_ID,
    prefix: process.env.PREFIX,
    token: process.env.TOKEN,
    activity: {
      name: `${process.env.PREFIX}help | fun stuff`,
      type: 3,
    },
  },

};