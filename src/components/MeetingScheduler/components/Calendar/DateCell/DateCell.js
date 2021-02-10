import React from 'react';
import './DateCell.css';
import blueCircle from './blue-circle.svg'

function DateCell(props) {
    let {date, meetings, createNewMeeting, displayMeetingDetails} = props;

    if (date <= 0)
        return <div className="GridItem disabled" key={date}></div>
    else
        return <div className="GridItem" key={date} onClick={createNewMeeting}>
            <span className="GridDate">{date}</span>
            <div className="DateCellUl">
                {meetings.map(meet =>
                    <div className="DateCellLi" key={meet.id} onClick={(e)=>{ e.stopPropagation(); displayMeetingDetails(meet)}}>
                        <img className="BlueCircle" src={blueCircle}/>
                        {meet.startTime.toLocaleTimeString()} - {meet.title}
                    </div>
                )}
            </div>
        </div>
}

export default DateCell;
