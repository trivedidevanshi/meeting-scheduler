import React from 'react';
import {configure, shallow} from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Main from "./Main";
import MeetingScheduler from "../MeetingScheduler/MeetingScheduler";

configure({adapter: new Adapter()});
describe("Main Component Testing", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Main/>);
    });
    it("Renders MeetingScheduler component", () => {
        expect(wrapper.exists('MeetingScheduler')).toEqual(true);
        expect(wrapper.find('MeetingScheduler').prop('meetings').length).toEqual(3);
    });
    it("should change user on calling changeUser prop", () => {
        expect(wrapper.find('MeetingScheduler').prop('user').value).toEqual("allUsers");
        wrapper.find('MeetingScheduler').prop('changeUser')({target: {value: "user1"}});
        expect(wrapper.find('MeetingScheduler').prop('user').value).toEqual("user1");
    });
    it("should not add meeting due to meeting collision", () => {
        let newMeeting = {
            creator: {label: "user4", value: "user4"},
            invites: [{label: "user5", value: "user5"}],
            title: "Meeting1",
            startTime: new Date(2021, 1, 3, 2, 30, 0, 0),
            endTime: new Date(2021, 1, 3, 3, 30, 0, 0),
            id: 10
        };
        expect(wrapper.find('MeetingScheduler').prop('meetings').length).toEqual(3);
        wrapper.find('MeetingScheduler').prop('onMeetingAdd')(newMeeting);
        expect(wrapper.find('MeetingScheduler').prop('meetings').length).toEqual(3);

    });
    it("should add meeting", () => {
        let newMeeting = {
            creator: {label: "user4", value: "user4"},
            invites: [{label: "user5", value: "user5"}],
            title: "Meeting1",
            startTime: new Date(2021, 1, 20, 2, 30, 0, 0),
            endTime: new Date(2021, 1, 20, 3, 30, 0, 0),
            id: 10
        };
        expect(wrapper.find('MeetingScheduler').prop('meetings').length).toEqual(3);
        wrapper.find('MeetingScheduler').prop('onMeetingAdd')(newMeeting);
        expect(wrapper.find('MeetingScheduler').prop('meetings').length).toEqual(4);

    });
});
