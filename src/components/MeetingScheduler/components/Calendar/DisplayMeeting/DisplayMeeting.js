import React from 'react';
import './DisplayMeeting.css';

function DisplayMeeting(props) {
    let {meeting, onClose, deleteMeeting, user} = props;
    return (
        !!meeting ? (<div className="DisplayMeetingModal">
            <div className="DisplayMeetingModalHeader">
                <button onClick={onClose}>x</button>
            </div>
            <div className="DisplayMeetingModalContent">
                <div>{meeting.title}</div>
                <hr/>
                <div>Creator: {meeting.creator.label}</div>
                <div>Invites: {meeting.invites.map(invite => invite.label + " ")}</div>
                <div>Meeting Start: {meeting.startTime.toLocaleString()}</div>
                <div>Meeting End: {meeting.endTime.toLocaleString()}</div>
                {user.value !== "allUsers" && (user.value === meeting.creator.label) && (<button onClick={() => {
                    onClose();
                    deleteMeeting(meeting.id);
                }}>Delete Meeting
                </button>)}
            </div>
        </div>) : (<></>)
    )

}

export default DisplayMeeting;