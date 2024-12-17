import { defineStore } from 'pinia';
// @ts-ignore
import { watch } from 'vue';
import dayjs from 'dayjs';

// Define types for habit and state
interface Habit {
  id: number;
  name: string;
  category: string;
}

interface CompletedHabits {
  [date: string]: { [habitId: number]: boolean };
}

interface State {
  habits: Habit[];
  completedHabits: CompletedHabits;
  selectedDate: string;
  categories: string[];
  nextHabitId: number;
}

export const useHabitStore = defineStore('habitStore', {
  state: (): State => ({
    habits: [
      { id: 1, name: 'Exercise', category: 'Health' },
      { id: 2, name: 'Read', category: 'Hobbies' },
      { id: 3, name: 'Meditate', category: 'Health' },
    ],
    completedHabits: {},
    selectedDate: new Date().toISOString().split('T')[0],
    categories: ['Health', 'Hobbies', 'Work'],
    nextHabitId: 4,
  }),

  actions: {
    toggleHabitCompletion(habitId: number): void {
      const date = this.selectedDate;
      if (!this.completedHabits[date]) {
        this.completedHabits[date] = {};
      }
      if (this.completedHabits[date][habitId]) {
        delete this.completedHabits[date][habitId];
      } else {
        this.completedHabits[date][habitId] = true;
      }
      if (Object.keys(this.completedHabits[date]).length === 0) {
        delete this.completedHabits[date];
      }
      // @ts-ignore
      localStorage.setItem(
        'completedHabits',
        JSON.stringify(this.completedHabits)
      );
    },

    addHabit(newHabit: Omit<Habit, 'id'>): void {
      const newId = this.nextHabitId;
      this.habits.push({ id: newId, ...newHabit });
      this.nextHabitId += 1;
      // @ts-ignore
      localStorage.setItem('habits', JSON.stringify(this.habits));
      // @ts-ignore
      localStorage.setItem('nextHabitId', this.nextHabitId.toString());
    },

    removeHabit(habitId: number): void {
      for (const date in this.completedHabits) {
        if (this.completedHabits[date][habitId]) {
          delete this.completedHabits[date][habitId];
        }
        if (Object.keys(this.completedHabits[date]).length === 0) {
          delete this.completedHabits[date];
        }
      }

      this.habits = this.habits.filter((habit: Habit) => habit.id !== habitId); // Explicitly type 'habit'

      // Save the updated data to localStorage
      // @ts-ignore
      localStorage.setItem('habits', JSON.stringify(this.habits));
      // @ts-ignore
      localStorage.setItem(
        'completedHabits',
        JSON.stringify(this.completedHabits)
      );
    },
    addCategory(newCategory: string): void {
      if (!this.categories.includes(newCategory)) {
        this.categories.push(newCategory);
        // @ts-ignore
        localStorage.setItem('categories', JSON.stringify(this.categories));
      }
    },

    editCategory(oldCategory: string, newCategory: string): void {
      const categoryIndex = this.categories.indexOf(oldCategory);
      if (categoryIndex !== -1) {
        this.categories.splice(categoryIndex, 1, newCategory);

        this.habits = this.habits.map((habit: Habit) =>
          habit.category === oldCategory
            ? { ...habit, category: newCategory }
            : habit
        );

        // Save updated data to localStorage
        // @ts-ignore
        localStorage.setItem('habits', JSON.stringify(this.habits));
        // @ts-ignore
        localStorage.setItem('categories', JSON.stringify(this.categories));
      }
    },
    deleteCategory(category: string): void {
      this.categories = this.categories.filter(
        (cat: string) => cat !== category
      );
      this.habits = this.habits.filter(
        (habit: Habit) => habit.category !== category
      );
      // @ts-ignore
      localStorage.setItem('habits', JSON.stringify(this.habits));
      // @ts-ignore
      localStorage.setItem('categories', JSON.stringify(this.categories));
    },

    loadFromLocalStorage(): void {
      // @ts-ignore
      const habits = localStorage.getItem('habits');
      // @ts-ignore
      const completedHabits = localStorage.getItem('completedHabits');
      // @ts-ignore
      const categories = localStorage.getItem('categories');
      // @ts-ignore
      const nextHabitId = localStorage.getItem('nextHabitId');
      if (habits) this.habits = JSON.parse(habits);
      if (completedHabits) this.completedHabits = JSON.parse(completedHabits);
      if (categories) this.categories = JSON.parse(categories);
      if (nextHabitId) this.nextHabitId = parseInt(nextHabitId, 10);
    },

    initLocalStorage(): void {
      this.loadFromLocalStorage();
      watch(
        () => this.habits,
        (newHabits: Habit[]) => {
          // @ts-ignore
          localStorage.setItem('habits', JSON.stringify(newHabits));
        },
        { deep: true }
      );
      watch(
        () => this.completedHabits,
        (newCompletedHabits: Record<string, Record<number, boolean>>) => {
          // @ts-ignore
          localStorage.setItem(
            'completedHabits',
            JSON.stringify(newCompletedHabits)
          );
        },
        { deep: true }
      );
      watch(
        () => this.categories,
        (newCategories: string[]) => {
          // @ts-ignore
          localStorage.setItem('categories', JSON.stringify(newCategories));
        },
        { deep: true }
      );
    },
  },

  getters: {
    isHabitCompleted:
      (state) =>
      (id: number): boolean => {
        const date = state.selectedDate;
        return !!state.completedHabits[date]?.[id];
      },

    getHabitStreak:
      (state) =>
      (habitId: number): number => {
        let streak = 0;
        let currentDate = dayjs().startOf('day');
        while (true) {
          const dateStr = currentDate.format('YYYY-MM-DD');
          if (state.completedHabits[dateStr]?.[habitId]) {
            streak += 1;
            currentDate = currentDate.subtract(1, 'day');
          } else {
            break;
          }
        }
        return streak;
      },
  },
});
