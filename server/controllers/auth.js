const {connect} = require('getstream');
const stream = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');



const signup = async (req,res) =>{

    try{
        const {fullname,username,password,phonenumber} = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = stream.connect('1188226','gbqhskc3xzxrmb22eegnq4t9jj96ab48v4yycy8phpf89prca2atsbn8agmfu67y'); //app_id,secret

        const hashedPassword =  await bcrypt.hash(password,10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({token,fullname,username,userId,hashedPassword,phonenumber});
    
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
   
    }

};



const login = async (req,res) =>{

    try{
    
        const {username,password}= req.body;
        const serverClient = stream.connect ('1188226','gbqhskc3xzxrmb22eegnq4t9jj96ab48v4yycy8phpf89prca2atsbn8agmfu67y'); //app_id,secret
        const client = StreamChat.getInstance('q8v6rbuyvfmk','gbqhskc3xzxrmb22eegnq4t9jj96ab48v4yycy8phpf89prca2atsbn8agmfu67y'); //api_key,secret
        const {users} = await client.queryUsers({name:username});
        if(!users.length) return res.status(400).json({ message:'user not found '});
        const success=await bcrypt.compare(password,users[0].hashedPassword);
        const token =  serverClient.createUserToken(users[0].id);
        
        if(success){
            res.status(200).json({token,fullname:users[0].fullName,username, userId:users[0].id});
        } else{
            res.status(500).json({message:'incorrect password'});
        }


    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }

};


module.exports ={signup,login};    