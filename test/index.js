const Chatfuel = require('../index')
chatfuel = new Chatfuel();
console.log(JSON.stringify(
    chatfuel.sendText('eeee')
        .sendButton({ text: 'HIHI', buttons: [chatfuel.creatButtonToBlock({ text: 'hahahaha', block_name: 'test1' })] })
        .redirectToBlock(['ahaha','ahaha'])
)
)