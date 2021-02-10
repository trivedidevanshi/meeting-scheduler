import React, {useState} from 'react';

import Calendar from "./components/Calendar/Calendar";
import GetDate from "./components/GetDate/GetDate"
import './MeetingScheduler.css'

function MeetingScheduler(props) {
    let {meetings, user, onMeetingAdd, userList, deleteMeeting, changeUser} = props;
    const [selectedDate, setSelectedDate] = useState(null);

    const selectNewDate = (newDate) => setSelectedDate(newDate);

    return (
        <div className="MeetingScheduler">
            <div className="Navbar">
                <GetDate selectNewDate={selectNewDate}/>
                <div className="SelectUser">
                    Select User:
                    <select defaultValue="allUsers" onChange={changeUser} className="SelectUserSelect">
                        {userList.map(user => <option key={user.label} value={user.value}>{user.value}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <Calendar selectedDate={selectedDate} meetings={meetings} user={user} onMeetingAdd={onMeetingAdd}
                          userList={userList} deleteMeeting={deleteMeeting}></Calendar>
            </div>
        </div>
    );
}

export default MeetingScheduler;