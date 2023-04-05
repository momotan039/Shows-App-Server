const Api=process.env.API
const jwt=require('jsonwebtoken')
const KeyApi=process.env.KEY
const Shows_API=process.env.SHOWS_API
const Error_Message={message:'occured error While handel the process'}
module.exports={Api,jwt,KeyApi,Shows_API,Error_Message}