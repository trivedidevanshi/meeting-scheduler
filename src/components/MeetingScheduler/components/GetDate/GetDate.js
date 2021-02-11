import React, {useEffect, useState} from "react";

import {months} from "../../constants/constants";
import './GetDate.css';

function GetDate(props) {
    let {selectNewDate} = props;

    let [currYear, setCurrYear] = useState(0);
    let [currMonth, setCurrMonth] = useState(0);

    useEffect(() => {
        let currDate = new Date();
        setCurrYear(currDate.getFullYear());
        setCurrMonth(currDate.getMonth());
    }, []);

    useEffect(() => {
        if (!!currYear && !!currMonth) {
            let newDate = new Date();
            newDate.setFullYear(currYear);
            newDate.setMonth(currMonth);
            selectNewDate(newDate);
        }
    }, [currYear, currMonth]);

    const changeMonth = (e) => setCurrMonth(e.target.value);
    const changeYear = (e) => setCurrYear(e.target.value);
    const prevMonth = () => {
        if (currMonth == 0) {
            setCurrMonth(11);
            setCurrYear(currYear - 1);
        } else
            setCurrMonth(currMonth - 1);
    };
    const nextMonth = () => {
        if (currMonth == 11) {
            setCurrMonth(0);
            setCurrYear(currYear + 1);
        } else
            setCurrMonth(currMonth + 1);
    };


    let optionItems = months.map((month, index) => <option key={index} value={index}>{month}</option>);
    return (
        <div className="GetDate">
            <button className="ChangeDateButton" onClick={prevMonth}>&lt;</button>
            <div>
                <select value={currMonth} onChange={changeMonth} className="ChangeMonthSelect">
                    {optionItems}
                </select>
                <input type="number" min={0} value={currYear} onChange={changeYear} className="ChangeYearInput"/>
            </div>
            <button className="ChangeDateButton" onClick={nextMonth}>&gt;</button>
        </div>
    );
}

export default GetDate;