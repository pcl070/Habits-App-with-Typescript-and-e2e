<template>
  <div class="homepage">
    <Calendar />
    <div>
      <!-- Sorting and Filtering Section -->
      <div class="filter-sort-section">
        <label for="categoryFilter">Filter by Category:</label>
        <select
          v-model="filterCategory"
          id="category-filter"
          data-testid="category-select"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>

        <!-- Button to edit categories -->
        <button @click="goToEditCategories" class="edit-categories-btn">
          Edit Categories
        </button>
      </div>

      <!-- Habit List with Pagination -->
      <div class="habit-list">
        <HabitItem
          v-for="habit in paginatedHabits"
          :key="habit.id"
          :habit="habit"
          :isCompleted="isHabitCompleted(habit.id)"
          :streak="habitStreak(habit.id)"
          @toggle-completion="toggleHabitCompletion"
          @delete-habit="removeHabit"
        />
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>

      <!-- Add habit section -->
      <div class="add-habit-section">
        <input
          v-model="newHabitName"
          placeholder="Enter new habit name"
          class="habit-input"
        />
        <!-- Character limit warning -->
        <span
          :class="{ 'warning-text': true, visible: newHabitName.length > 25 }"
          >Habit name should be 25 characters or less!</span
        >
        <!-- Category selection-->
        <select
          v-model="selectedCategory"
          class="habit-category"
          data-testid="category-select"
        >
          <option disabled value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <button
          @click="addHabit"
          :disabled="newHabitName.length > 25"
          class="icon-btn add-btn"
          data-testid="add-habit-btn"
        >
          <div class="add-icon"></div>
          <div class="btn-txt">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="var(--button-text-color)"
            >
              <path
                d="M4 12H20M12 4V20"
                stroke="var(--button-text-color)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { ref, computed, watch, type Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useHabitStore } from '../stores';
import Calendar from '../components/Calendar.vue';
import HabitItem from '../components/HabitItem.vue';

interface Habit {
  id: number;
  name: string;
  category: string;
}

export default {
  name: 'HomePage',
  components: { Calendar, HabitItem },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const habitStore = useHabitStore();

    const habits = computed<Habit[]>(() => habitStore.habits);
    const categories = computed<string[]>(() => habitStore.categories);

    const isHabitCompleted = (id: number): boolean =>
      habitStore.isHabitCompleted(id);
    const toggleHabitCompletion = (id: number): void =>
      habitStore.toggleHabitCompletion(id);
    const habitStreak = (id: number): number => habitStore.getHabitStreak(id);

    // State for new habit input
    // State for new habit input
    const newHabitName: Ref<string> = ref(''); // Explicitly typed Ref
    const selectedCategory: Ref<string> = ref(''); // Explicitly typed Ref

    // Watcher for newHabitName to capitalize the first letter
    watch(newHabitName, (value: string) => {
      if (value) {
        newHabitName.value = value.charAt(0).toUpperCase() + value.slice(1);
      }
    });

    // Add habit function with validation
    const addHabit = (): void => {
      if (newHabitName.value.trim() && selectedCategory.value.trim()) {
        habitStore.addHabit({
          name: newHabitName.value.trim(),
          category: selectedCategory.value.trim(),
        });

        // Clear the fields after adding a habit
        newHabitName.value = '';
        selectedCategory.value = '';
      } else {
        // Properly typed `window.alert`
        // @ts-ignore
        alert('Please enter a habit name and select a category');
      }
    };

    const goToEditCategories = (): void => {
      router.push({ name: 'EditCategories' });
    };

    // Pagination and Filtering State
    const filterCategory: Ref<string> = ref('');
    const currentPage: Ref<number> = ref(1);
    const habitsPerPage = 5;

    const filteredHabits = computed<Habit[]>(() => {
      return filterCategory.value
        ? habits.value.filter(
            (habit: Habit) => habit.category === filterCategory.value
          )
        : habits.value;
    });

    const totalPages = computed<number>(() => {
      return Math.ceil(filteredHabits.value.length / habitsPerPage);
    });

    const paginatedHabits = computed<Habit[]>(() => {
      const start = (currentPage.value - 1) * habitsPerPage;
      const end = start + habitsPerPage;
      return filteredHabits.value.slice(start, end);
    });

    const nextPage = (): void => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = (): void => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    watch(filterCategory, () => {
      currentPage.value = 1;
    });

    const removeHabit = (habitId: number): void => {
      habitStore.removeHabit(habitId);
    };

    watch(
      () => route.params.date,
      (newDate: string | undefined) => {
        // Add explicit type for newDate
        if (newDate) {
          habitStore.selectedDate = newDate; // No need for 'as string'
        }
      },
      { immediate: true }
    );

    return {
      habits,
      categories,
      isHabitCompleted,
      toggleHabitCompletion,
      habitStreak,
      removeHabit,
      newHabitName,
      selectedCategory,
      addHabit,
      filterCategory,
      currentPage,
      totalPages,
      paginatedHabits,
      nextPage,
      prevPage,
      goToEditCategories,
    };
  },
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10px;
  min-height: 95vh;
}

.habit-list {
  display: flex;
  flex-direction: column;
  min-width: 350px;
}

.add-habit-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.habit-input,
.habit-category,
#category-filter {
  border: 1px solid;
  border-color: var(--buton-bord-color);
  border-radius: 15px;
  padding: 8px;
}

#category-filter {
  margin-left: 5px;
}

.filter-sort-section {
  margin: 15px 0;
}

.warning-text {
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-top: 60px;
  border: #212121 solid 1px;
  border-radius: 15px;
  background-color: rgb(255 0 0 / 52.1%);
  padding: 0 4px;
  color: rgb(0 0 0);
  font-size: 12px;
}

.warning-text.visible {
  opacity: 1;
}

button {
  transition: ease 0.1s;
  margin-left: 10px;
  box-shadow: #212121 2px 2px 5px;
  border: 1px solid;
  border-color: var(--buton-bord-color);
  border-radius: 15px;
  padding: 8px 10px;
}

button:disabled {
  cursor: not-allowed;
  background-color: rgb(219 135 135);
}

button:hover:enabled {
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

@media (width <= 850px) {
  .homepage {
    flex-direction: column;
  }
}
</style>
