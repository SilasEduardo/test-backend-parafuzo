import * as moment from 'moment';


export default function calculateTimeDifference(entryTime: Date, exitTime: Date) {

  const actualExitTime = exitTime || new Date();

  const entryMoment = moment(entryTime);
  const exitMoment = moment(actualExitTime);

  const differenceInMinutes = exitMoment.diff(entryMoment, 'minutes');

  return `${differenceInMinutes} minutes`;
}
