import React, {useEffect, useState} from 'react';
import './NewMeeting.css'
import MultiSelect from "react-multi-select-component";

function NewMeeting(props) {

    let {date, onClose, onMeetingAdd, userList, user} = props;
    const [selected, setSelected] = useState([]);
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(date);
    const [collidingUsers, setCollidingUsers] = useState([]);
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
        setCollidingUsers([]);
        let response = onMeetingAdd({
            id: new Date().getTime(),
            title: e.target.title.value,
            creator: user,
            invites: selected,
            startTime: startDate,
            endTime: endDate
        });
        if (response.isCollision) {
            // alert("collision with "+response.collidingUsers);
            setCollidingUsers(response.collidingUsers);
        } else {
            onClose();
            setCollidingUsers([]);
        }
    };

    const onCloseModal = () => {
        setCollidingUsers([]);
        onClose();
    };
    return (
        (!!date && user.value !== "allUsers") ? (<div className="NewMeetingModal">
            <div className="NewMeetingModalHeader">
                <button onClick={onCloseModal}>x</button>
            </div>
            <div className="NewMeetingModalContent">
                <div>Create New Meeting</div>
                <hr/>
                <form onSubmit={formSubmit}>
                    <label htmlFor="startDate">Meeting Title: <input type="text" id="title" name="title"
                                                                     placeholder="Enter Meeting Title"
                                                                     required/></label>
                    <label>Creator: {user.value}</label>
                    <label className="NewMeetingModalUserSelectLabel">Invite: <MultiSelect
                        options={userList.filter(u => u.value !== user.value)}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Select"}
                        required
                        className="NewMeetingModalUserSelect"
                    />
                    </label>

                    <label htmlFor="startDate">Start Meeting: <input type="datetime-local" name="startDate"
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

                    {collidingUsers.length > 0 && (
                        <div className="displayError">
                            &#x21; The meeting collides with users {collidingUsers}.<br/>
                            Please select different meeting time.
                        </div>)}
                    <input type="submit" value="Create Meeting"/>
                </form>
            </div>
        </div>) : (<></>)
    )
}

export default NewMeeting;