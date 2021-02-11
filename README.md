# Meeting-Scheduler
This is a meeting scheduler where user can create, delete, view a meeting which will be displayed on a calendar. 

The application is created using ReactJS, HTML5 and CSS3. 

It also includes demo unit tests(Main.test.js) for the reusable components which helps achieving a good code coverage. It uses Enzyme for testing. 

The calendar is a responsive, reusable component. It takes in meetings and users as props.

## Application Experience:
A DB of 3 meetings is created for feb 2021. 

When the app first loads, meetings of all users is visible. Meeting details can be viewed by clicking on existing meeting. They can not delete the meeting nor create one. 

Select a user1 and navigate to Feb 2021 to view existing meetings. On selecting, if the user has created the meeting, he can delete it.

Click on the date you want to add a meeting on, fill the form and create meeting to view on the calendar. Select invites, the creator will not be in the invites option.

If any of the meeting invitees have a meeting clash, an error will be displayed.

## Functionalities
- View meetings
- Change user to view their meetings.
- Change the month and year to view meetings during a particular month.
- Arrows to navigate between previous and next months.
- Detailed meeting view.
- Delete meeting if created by the user
- Create a new meeting.
- Cannot add yourself to meeting
- Can select end date only after start date.
- Informs meeting clashes while creating a new one.

## Available Scripts

In the project directory, you can run:

 ### `npm install`
 
Installs node modules for the application.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

 
 ### `npm test`
 
To test the 'src/components/Main/Main.test.js' file.