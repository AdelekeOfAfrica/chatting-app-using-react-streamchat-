import React from 'react'
import {Channel,useChatContext,MessageTeam} from 'stream-chat-react';
import{ChannelInner,CreateChannel,EditChannel} from './';


const ChanelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType
}) => {


if(isCreating){
    return(
      <div className = "channel__container" >
        <CreateChannel  createType={createType} setIsCreating ={setIsCreating}/>
      </div>

    )
}

if(isEditing){
  return(
    <div className = "channel__container" >
    <EditChannel   setIsEditing ={setIsEditing}/>
  </div>
  )
}

const EmptyState = () => (
    <div className = "channl-empty__container">
      <p className = "channel-empty__first"> This is the Begining of your Chat History </p>
      <p className = "channel-empty__second"> Send messages, attachments,links,emojis.</p>
    </div>
)
  return (
    <div className = "channel__Container">
     <Channel
        EmptyStateIndicator ={EmptyState}
        Message = {(messageProps , i) =><MessageTeam key={i} {...messageProps} />}>
            <ChannelInner  setIsEditing = {setIsEditing}/>
     </Channel>
    </div>
  )
}

export default ChanelContainer
