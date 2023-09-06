const { getIOInstance } = require("../configs/websocket.config");
const { ALL_TRACTOR_COMMAND } = require("../constants");
const { getUser } = require("./user.service");


class CommandService {
    static async sendCommand({ userId, command }) {
        const io = getIOInstance();
        const tractorId = command.tractorId;
        if(tractorId !== ALL_TRACTOR_COMMAND) {
            console.log('Event name:', `${userId}-${tractorId}-ack`);
            io.emit(`${userId}-${tractorId}`, command);
        } else {
            const user = await getUser({ user_id: userId });

            for(let i = 0 ; i < user.tractorList.length ; i++) {
                io.emit(`${user._id}-${tractorId}`, command);
            }
        }
        return command;
    }
}

module.exports = CommandService;