import React from 'react';
import './DateCell.css';

function DateCell(props) {
    let {date, meetings, createNewMeeting, displayMeetingDetails} = props;

    if (date <= 0)
        return <div className="GridItem disabled" key={date}></div>
    else
        return <div className="GridItem" key={date} onClick={createNewMeeting}>
            <span className="GridDate">{date}</span>
            <div className="DateCellMeetingList">
                {meetings.map(meet =>
                    <div className="DateCellMeetingListItem" key={meet.id} onClick={(e) => {
                        e.stopPropagation();
                        displayMeetingDetails(meet)
                    }}>
                        <span>&#8729;</span>
                        {meet.startTime.toLocaleTimeString()} - {meet.title}
                    </div>
                )}
            </div>
        </div>
}

export default DateCell;
