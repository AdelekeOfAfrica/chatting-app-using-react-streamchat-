import React, {useState} from 'react';
import { StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';


import {Auth,ChanelListContainer,ChanelContainer} from './components';


 //import 'stream-chat-react/dist/css/index.css';
import './App.css';



const cookies = new Cookies();

const apikey =  'q8v6rbuyvfmk';
const authtoken = cookies.get("token") ;

const client = StreamChat.getInstance(apikey);

if(authtoken) {
  client.connectUser({
   name: cookies.get('username'),
   fullname: cookies.get('fullname'),
   id: cookies.get('userId'),
   phonenumber: cookies.get('phonenumber'),
   image: cookies.get('avatarurl'),
   hashedPassword:  cookies.get('hashedPassword'),
  },authtoken)
}



const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating,setIsCreating] = useState(false);
  const [isEditing,setIsEditing] =  useState(false);
   if(!authtoken) return <Auth />
  return (
    <div className = "app__wrapper">
        <Chat client={client} theme="team Light "> 
          <ChanelListContainer
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}
          setCreateType = {setCreateType} 
          isEditing = {isEditing}/>
          <ChanelContainer 
           isCreating = {isCreating}
           setIsCreating = {setIsCreating}
           setIsEditing = {setIsEditing} 
           isEditing = {isEditing}
           createtype = {createType} />
        </Chat>
    </div>
  )
}

export default App
