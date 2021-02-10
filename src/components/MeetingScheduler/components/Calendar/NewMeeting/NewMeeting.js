import React, {useEffect, useState} from 'react';
import './NewMeeting.css'
import MultiSelect from "react-multi-select-component";

function NewMeeting(props) {

    let {date, onClose, onMeetingAdd, userList, user} = props;
    const [selected, setSelected] = useState([]);
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(date);

    useEffect(() => {
        setStartDate(date);
        setEndDate(date);
    }, [date]);

    let dateConverter = (date) => {
        let tempDate = new Date(date);
        let offset = tempDate.getTimezoneOffset();
        tempDate.setMinutes(tempDate.getMinutes() - offset);
        return tempDate.toISOString().split('Z')[0];
    };

    let formSubmit = (e) => {
        e.preventDefault();
        onMeetingAdd({
            id: new Date().getTime(),
            title: e.target.title.value,
            creator: user,
            invites: selected,
            startTime: startDate,
            endTime: endDate
        });
        onClose();
    };


    return (
        (!!date && user.value !== "allUsers") ? (<div className="NewMeetingModal">
            <div className="NewMeetingModalHeader">
                <button onClick={onClose}>x</button>
            </div>
            <div className="NewMeetingModalContent">
                <form onSubmit={formSubmit}>
                    <label htmlFor="startDate">Meeting Title: <input type="text" id="title" name="title"
                                                                    placeholder="Enter Meeting Title" required/></label>
                    <label>Creator: {user.value}</label>
                    <label>Invite: <MultiSelect
                            options={userList}
                            value={selected}
                            onChange={setSelected}
                            labelledBy={"Select"}
                            required
                            className="NewMeetingModalUserSelect"
                        />
                    </label>

                    <label htmlFor="startDate">Start Meeting: <input type="datetime-local" name="startDate"
                        // min={dateConverter(new Date())}
                                                                    value={dateConverter(startDate)}
                                                                    onChange={(e) => {
                                                                        setStartDate(new Date(e.target.value))
                                                                    }}
                                                                    required/></label>
                    <label htmlFor="endDate">End Meeting: <input type="datetime-local" name="endDate"
                                                                min={dateConverter(startDate)}
                                                                value={dateConverter(endDate)}
                                                                onChange={(e) => {
                                                                    setEndDate(new Date(e.target.value))
                                                                }}
                                                                required/></label>
                    <input type="submit" value="Create Meeting"/>
                </form>
            </div>
        </div>) : (<></>)
    )
}

export default NewMeeting;