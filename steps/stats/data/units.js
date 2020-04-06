import moment from "moment";

function getEventDate(dob, params) {
  const date = new Date(dob);
  let diff = 0;

  if (params.years != null) {
    date.setFullYear(date.getFullYear() + params.years);
  } else if (params.months != null) {
    date.setMonth(date.getMonth() + params.months);
  } else if (params.days != null) {
    date.setDate(date.getDate() + params.days);
  } else if (params.hours != null) {
    date.setHours(date.getHours() + params.hours);
  } else if (params.minutes != null) {
    date.setMinutes(date.getMinutes() + params.minutes);
  } else if (params.seconds != null) {
    date.setSeconds(date.getSeconds() + params.seconds);
  }

  return date;
}

export const units = [
  {
    name: "Years",
    unit: "years",
    events: Array(24)
      .fill(0)
      .map((_, idx) => ({
        name: `${(idx + 1) * 5} years`,
        getTimeTo: dob => getEventDate(dob, { years: (idx + 1) * 5 })
      }))
  },
  {
    name: "Months",
    unit: "months",
    events: Array(15)
      .fill(0)
      .map((_, idx) => ({
        name: `${(idx + 1) * 100} months`,
        getTimeTo: dob => getEventDate(dob, { months: (idx + 1) * 100 })
      }))
  },
  {
    name: "Days",
    unit: "days",
    events: Array(45)
      .fill(0)
      .map((_, idx) => ({
        name: `${(idx + 1) * 1000} days`,
        getTimeTo: dob => getEventDate(dob, { days: (idx + 1) * 1000 })
      }))
  },
  {
    name: "Hours",
    unit: "hours",
    events: Array(20)
      .fill(0)
      .map((_, idx) => ({
        name: `${(idx + 1) * 50000} hours`,
        getTimeTo: dob => getEventDate(dob, { hours: (idx + 1) * 50000 })
      }))
  },
  {
    name: "Minutes",
    unit: "minutes",
    events: Array(60)
      .fill(0)
      .map((_, idx) => ({
        name: `${(idx + 1) * 1000000} minutes`,
        getTimeTo: dob => getEventDate(dob, { minutes: (idx + 1) * 1000000 })
      }))
  },
  {
    name: "Seconds",
    unit: "seconds",
    events: Array(40)
      .fill(0)
      .map((_, idx) => ({
        name: `${(idx + 1) * 100000000} seconds`,
        getTimeTo: dob => getEventDate(dob, { seconds: (idx + 1) * 100000000 })
      }))
  }
];
