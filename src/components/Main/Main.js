import React, {useEffect, useState} from 'react'
import MeetingScheduler from "../MeetingScheduler/MeetingScheduler";

const userList = [
    {label: "user1", value: "user1"},
    {label: "user2", value: "user2"},
    {label: "user3", value: "user3"},
    {label: "user4", value: "user4"},
    {label: "user5", value: "user5"},
    {label: "allUsers", value: "allUsers"}
];
let demo_meetings = [
    {
        creator: userList[0],
        invites: [userList[1], userList[2]],
        title: "Meeting1",
        startTime: new Date(2021, 1, 3, 2, 30, 0, 0),
        endTime: new Date(2021, 1, 3, 3, 30, 0, 0),
        id: 1
    },
    {
        creator: userList[1],
        invites: [userList[0], userList[2]],
        title: "Meeting2",
        startTime: new Date(2021, 1, 3, 4, 30, 0, 0),
        endTime: new Date(2021, 1, 3, 5, 30, 0, 0),
        id: 2
    },
    {
        creator: userList[1],
        invites: [userList[0], userList[4]],
        title: "Meeting3",
        startTime: new Date(2021, 1, 4, 4, 30, 0, 0),
        endTime: new Date(2021, 1, 4, 5, 30, 0, 0),
        id: 3
    }
];

function Main() {
    let [meetings, setMeetings] = useState(demo_meetings);
    let [user, setUser] = useState({label: "allUsers", value: "allUsers"});

    useEffect(() => {
        if (user.value === "allUsers") {
            setMeetings(demo_meetings);
        } else {
            setMeetings(demo_meetings.filter(meet => ((meet.creator.value === user.value) || (meet.invites.find(invite => invite.value === user.value)))));
        }
    }, [user]);

    const onMeetingAdd = (meetingDetail) => {
        setMeetings([...meetings, meetingDetail]);
    };
    const deleteMeeting = (meetingId) => {
        setMeetings(meetings.filter(meet => meet.id !== meetingId));
    };
    const changeUser = (userData) => {

        console.log(userData.target.value);
        let userValue = userData.target.value;
        setUser({label: userValue, value: userValue});
    };

    return (
        <div>
            <MeetingScheduler meetings={meetings} user={user} onMeetingAdd={onMeetingAdd} userList={userList}
                              deleteMeeting={deleteMeeting} changeUser={changeUser}/>
        </div>
    );
}

export default Main;