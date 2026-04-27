const SLOT_DURATION_MINUTES = 40;

type DailySchedule = {
  start: string;
  end: string;
};

const WEEKDAY_SCHEDULE: DailySchedule = {
  start: "09:00",
  end: "19:00"
};

const SATURDAY_SCHEDULE: DailySchedule = {
  start: "10:00",
  end: "14:00"
};

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60) + minutes;
};

const toTimeLabel = (totalMinutes: number): string => {
  const hours = `${Math.floor(totalMinutes / 60)}`.padStart(2, "0");
  const minutes = `${totalMinutes % 60}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getScheduleForDate = (date: string): DailySchedule | null => {
  const [year, month, day] = date.split("-").map(Number);
  const weekDay = new Date(year, month - 1, day).getDay();

  if (weekDay >= 1 && weekDay <= 5) {
    return WEEKDAY_SCHEDULE;
  }

  if (weekDay === 6) {
    return SATURDAY_SCHEDULE;
  }

  return null;
};

export const getAvailableTimeSlotsForDate = (date: string): string[] => {
  const schedule = getScheduleForDate(date);

  if (!schedule) {
    return [];
  }

  const startMinutes = parseTime(schedule.start);
  const endMinutes = parseTime(schedule.end);
  const slots: string[] = [];

  for (let current = startMinutes; current + SLOT_DURATION_MINUTES <= endMinutes; current += SLOT_DURATION_MINUTES) {
    slots.push(toTimeLabel(current));
  }

  return slots;
};

export const isValidTimeSlotForDate = (date: string, time: string): boolean => {
  return getAvailableTimeSlotsForDate(date).includes(time);
};
