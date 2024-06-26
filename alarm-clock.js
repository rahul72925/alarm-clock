class Alarm {
  constructor(time, day) {
    this.time = time;
    this.day = day;
    this.maxSnoozeCount = 3;
    this.currentSnooze = 0;
  }
  makeDoubleDigit(num) {
    return String(num).padStart(2, "0");
  }

  snoozeAlarm() {
    if (this.currentSnooze < this.maxSnoozeCount) {
      this.currentSnooze += 1;
      const [hours, minutes] = this.time.split(":").map(Number);
      let snoozeTime = new Date();
      snoozeTime.setHours(hours, minutes + 5);
      this.time = `${this.makeDoubleDigit(
        snoozeTime.getHours()
      )}:${this.makeDoubleDigit(snoozeTime.getMinutes())}`;

      console.log(`Alarm snoozed: ${this.time}`);
    }
  }
}

class AlarmClock {
  constructor() {
    this.weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    this.alarms = [];
  }

  getCurrentFormattedTime() {
    const currentTime = new Date();

    function makeDoubleDigit(num) {
      return String(num).padStart(2, "0");
    }

    const time = [
      makeDoubleDigit(currentTime.getHours()),
      makeDoubleDigit(currentTime.getMinutes()),
      makeDoubleDigit(currentTime.getSeconds()),
      currentTime.getDay(),
    ];
    return time;
  }

  showTime() {
    const [hh, mm, ss, day] = this.getCurrentFormattedTime();

    console.log("currentTime", `${hh}:${mm}:${ss} ${this.weekday[day]}`);
  }

  addAlarm(time, day) {
    const alarm = new Alarm(time, day);
    this.alarms.push(alarm);
    console.log("alarm added successfully on", time, day);
  }

  checkAlarms() {
    const [hh, mm, ss, day] = this.getCurrentFormattedTime();

    this.alarms.forEach((eachAlarm) => {
      if (
        eachAlarm.time === `${hh}:${mm}` &&
        eachAlarm.day === this.weekday[day]
      ) {
        // ring
        const num = Math.floor(Math.random() * 10);
        console.log("ring ring! It's", eachAlarm.time);

        // auto snooze the alarm
        if (num === 3) {
          eachAlarm.snoozeAlarm();
        }
      }
    });
  }

  deleteAlarm(time, day) {
    this.alarms = this.alarms.filter(
      (eachAlarm) => !(eachAlarm.time === time && eachAlarm.day === day)
    );
    console.log("alarm deleted", time, day);
  }

  startClock() {
    setInterval(() => {
      this.showTime();
      this.checkAlarms();
    }, 1000);
  }
}

const orpatClock = new AlarmClock();
orpatClock.addAlarm("12:36", "Wednesday");
orpatClock.startClock();
