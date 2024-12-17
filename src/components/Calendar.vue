<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="previousMonth">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="var(--button-text-color)"
        >
          <path
            d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"
          />
        </svg>
      </button>
      <h2>{{ monthYear }}</h2>
      <button @click="nextMonth">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="var(--button-text-color)"
        >
          <path
            d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
          />
        </svg>
      </button>
    </div>
    <div class="calendar-grid">
      <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
      <div
        v-for="day in daysInMonth"
        :key="day.format('YYYY-MM-DD')"
        :class="[
          'calendar-day',
          {
            'disabled-day': isFutureDay(day),
            'selected-day': isSelectedDay(day),
          },
        ]"
        @click="!isFutureDay(day) && goToDay(day)"
      >
        <div class="progress-circle" :style="getProgressStyle(day)">
          <span>{{ day.date() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { ref, computed, watch } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter, useRoute } from 'vue-router';
import { useHabitStore } from '../stores';

export default {
  setup() {
    const habitStore = useHabitStore();
    const router = useRouter();
    const route = useRoute();
    const today: Dayjs = dayjs().startOf('day');

    // Track the currently selected date
    const selectedDate = ref<string>(today.format('YYYY-MM-DD'));

    // Initialize `currentMonth` to match the selected date if available, or fallback to today's month
    const currentMonth = ref<Dayjs>(
      dayjs(
        typeof route.params.date === 'string' ? route.params.date : today
      ).startOf('month')
    );

    const weekdays: string[] = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];

    const daysInMonth = computed<Dayjs[]>(() => {
      const startOfMonth = currentMonth.value.startOf('month').startOf('week');
      const endOfMonth = currentMonth.value.endOf('month').endOf('week');
      const days: Dayjs[] = [];

      for (
        let day = startOfMonth;
        day.isBefore(endOfMonth);
        day = day.add(1, 'day')
      ) {
        days.push(day);
      }
      return days;
    });

    const monthYear = computed<string>(() =>
      currentMonth.value.format('MMMM YYYY')
    );

    const goToDay = (day: Dayjs): void => {
      const formattedDate = day.format('YYYY-MM-DD');
      selectedDate.value = formattedDate;
      router.push({ name: 'day', params: { date: formattedDate } });
    };

    const previousMonth = (): void => {
      currentMonth.value = currentMonth.value.subtract(1, 'month');
    };

    const nextMonth = (): void => {
      currentMonth.value = currentMonth.value.add(1, 'month');
    };

    const isFutureDay = (day: Dayjs): boolean => {
      return day.isAfter(today);
    };

    const isSelectedDay = (day: Dayjs): boolean => {
      return day.format('YYYY-MM-DD') === selectedDate.value;
    };

    const getProgressStyle = (day: Dayjs): Record<string, string | number> => {
      const date = day.format('YYYY-MM-DD');
      const totalHabits: number = habitStore.habits.length;

      const completedHabits: number = habitStore.completedHabits[date]
        ? Object.keys(habitStore.completedHabits[date]).filter(
            (habitId: string) =>
              habitStore.habits.some(
                (habit: { id: number }) => habit.id === parseInt(habitId, 10)
              )
          ).length
        : 0;

      const progressPercentage: number = totalHabits
        ? (completedHabits / totalHabits) * 100
        : 0;

      return {
        background: `conic-gradient(#6E659C ${progressPercentage}%, #e0e0e0 ${progressPercentage}%)`,
        borderRadius: '50%',
        opacity: isFutureDay(day) ? 0.3 : 1,
      };
    };

    // Watch for changes in the route parameter `date` to update `selectedDate` and `currentMonth`
    watch(
      () => route.params.date,
      (newDate: string | string[] | undefined) => {
        if (typeof newDate === 'string') {
          currentMonth.value = dayjs(newDate).startOf('month');
        }
      },
      { immediate: true }
    );

    return {
      daysInMonth,
      monthYear,
      weekdays,
      goToDay,
      previousMonth,
      nextMonth,
      isFutureDay,
      isSelectedDay,
      getProgressStyle,
    };
  },
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  box-shadow: #212121 5px 2px 10px;
  border: 2px solid #212121;
  border-radius: 15px;
  background: rgb(65 59 97);
  background: var(--light-elements-color);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  font-family: Arial, Helvetica, sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
}

.calendar-header button {
  transition: ease 0.1s;
  box-shadow: #212121 2px 2px 5px;
  border: 2 px solid #212121;
  border-radius: 15px;
  padding: 10px;
}

.calendar-header button:hover {
  cursor: pointer;
  margin: 0 2px;
  padding: 8px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 100%;
}

.weekday {
  padding: 5px 0;
  font-weight: bold;
  text-align: center;
}

.calendar-day {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.disabled-day {
  opacity: 0.5;
  pointer-events: none;
}

.progress-circle {
  display: flex;
  justify-content: center;
  align-items: center;

  /* Add transition for background change */
  transition: background 0.3s ease; /* This line animates the progress */
  border-radius: 50%;
  background: #e0e0e0;
  width: 40px;
  height: 40px;
  color: #333;
  font-size: 14px;
}

.progress-circle span {
  position: relative;
  z-index: 1;
}

/* Add style for the selected day with an inner border effect */
.selected-day .progress-circle {
  transition: 0.3s;
  box-shadow: inset 0 0 0 2px rgb(125 125 228); /* Creates an inner blue border */
}

/* Mobile display styles */

@media (width <= 700px) {
  .calendar {
    padding: 20px 0;
  }

  .calendar-header button {
    margin: 0 5px;
  }
}
</style>
