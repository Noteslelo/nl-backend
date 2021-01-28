const Message = require('../modals/messages')

const createMessage = async (req,res, next) => {

    const {name, email, message} = req.body
    const newMessage = new Message({
        name, 
        email,
        message,
        sentDate: new Date()
    })
    try {
        await newMessage.save()
    } catch(err){
        console.log(err)
        return next(err)
    }
    res.status(201).json({message:"Message sent", data: newMessage})

}
const getMessages = async (req,res,next) => {
    let messages = []

    try {
        messages = await Message.find({})
    }
    catch (err){
        console.log(err)
        return next(er)
    }
    if(!messages){
        return res.status(404).json("Message not found")
    }
    res.send({messages})
}
const deleteMessage = async (req , res , next)=> {
    const messageId = req.params.messageId
    let delmessage
    try{
        delmessage = await Message.findById(messageId)
    } catch(err) {
        console.log(err)
        return next(err)
    }
    try {
        await delmessage.remove()
    } catch(err) {
        console.log(err)
        return next(err)
    }
    res.status(200).json("Deleted")
}
exports.createMessage = createMessage
exports.getMessages = getMessages
exports.deleteMessage = deleteMessage
