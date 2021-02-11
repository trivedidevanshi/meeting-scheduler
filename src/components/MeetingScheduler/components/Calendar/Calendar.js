import React, {useEffect, useState} from 'react';
import './Calendar.css';
import DateCell from "./DateCell/DateCell";
import NewMeeting from "./NewMeeting/NewMeeting";
import DisplayMeeting from "./DisplayMeeting/DisplayMeeting";

function Calendar(props) {
    let {selectedDate, meetings, user, onMeetingAdd, userList, deleteMeeting} = props;

    let [gridItems, setGridItems] = useState([]);
    let [newMeetingOpen, setNewMeetingOpen] = useState(null);
    let [displayMeeting, setDisplayMeeting] = useState(null);


    useEffect(() => {
        if (selectedDate) {
            let getFirstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
            let getTotalDays = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
            generateGrid(getFirstDay.getDay(), getTotalDays.getDate());
            setNewMeetingOpen(null);
            setDisplayMeeting(null);
        }
    }, [selectedDate, meetings, user]);


    let gridDays =
        <>
            <div className="GridHeaderItem">Sun</div>
            <div className="GridHeaderItem">Mon</div>
            <div className="GridHeaderItem">Tue</div>
            <div className="GridHeaderItem">Wed</div>
            <div className="GridHeaderItem">Thurs</div>
            <div className="GridHeaderItem">Fri</div>
            <div className="GridHeaderItem">Sat</div>
        </>;

    let dateConverter = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());


    let generateGrid = (firstDay, totalDays) => {
        let grid = [];
        for (let i = (-1 * firstDay) + 1; i <= totalDays; i++) {
            let currDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            let todayMeetings = meetings.filter(meet => currDate >= dateConverter(meet.startTime) && currDate <= dateConverter(meet.endTime));
            grid.push({date: i, meetings: todayMeetings, fullDate: currDate});
        }
        setGridItems(grid);
    };

    return (
        <div className="Calender">
            <div className="GridContainer">
                {gridDays}
                {
                    gridItems.map(item => <DateCell date={item.date} meetings={item.meetings} key={item.date}
                                                    createNewMeeting={setNewMeetingOpen.bind(this, item.fullDate)}
                                                    displayMeetingDetails={(data) => setDisplayMeeting(data)}/>)
                }
            </div>
            <NewMeeting date={newMeetingOpen} onClose={setNewMeetingOpen.bind(this, null)} onMeetingAdd={onMeetingAdd}
                        userList={userList} user={user}/>
            <DisplayMeeting meeting={displayMeeting} onClose={setDisplayMeeting.bind(this, null)}
                            deleteMeeting={deleteMeeting} user={user}></DisplayMeeting>
        </div>
    );
}

export default Calendar;