<template>
  <div class="habit-item" data-testid="habit-item">
    <div class="habit-content" data-testid="habit-content">
      <div class="checkbox-wrapper" data-testid="checkbox-wrapper">
        <input
          type="checkbox"
          class="check"
          :checked="isCompleted"
          @change="toggleCompletion"
          :id="`habit-${habit.id}`"
          data-testid="habit-checkbox"
        />
        <label
          :for="`habit-${habit.id}`"
          class="label"
          data-testid="habit-label"
        >
          <svg width="45" height="45" viewBox="0 0 95 95">
            <rect x="30" y="20" width="50" height="50" fill="none"></rect>
            <g transform="translate(0,-952.36222)">
              <path
                d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                stroke="var(--delete-button-color)"
                stroke-width="3"
                fill="none"
                class="path1"
              ></path>
            </g>
          </svg>
          <span data-testid="habit-name">{{ habit.name }}</span>
        </label>
      </div>

      <span v-if="streak > 2" class="streak" data-testid="habit-streak"
        >🔥 {{ streak }} days</span
      >
    </div>

    <button class="btn" @click="deleteHabit" data-testid="delete-habit-btn">
      <svg
        viewBox="0 0 15 17.5"
        height="17.5"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
      >
        <path
          transform="translate(-2.5 -1.25)"
          d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
          id="Fill"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { defineComponent, PropType } from 'vue';

interface Habit {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'HabitItem',
  props: {
    habit: {
      type: Object as PropType<Habit>,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    streak: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleCompletion(this: {
      $emit: (event: string, payload: number) => void;
      habit: Habit;
    }): void {
      this.$emit('toggle-completion', this.habit.id);
    },
    deleteHabit(this: {
      $emit: (event: string, payload: number) => void;
      habit: Habit;
    }): void {
      this.$emit('delete-habit', this.habit.id);
    },
  },
});
</script>

<style scoped>
.habit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.habit-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-wrapper input[type='checkbox'] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper * {
  box-sizing: border-box;
  user-select: none;
}

.checkbox-wrapper {
  display: block;
  position: relative;
  overflow: hidden;
}

.checkbox-wrapper .label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-wrapper .check {
  position: absolute;
  opacity: 0;
  width: 50px;
  height: 50px;
}

.checkbox-wrapper .label svg {
  stroke: var(--delete-button-color);
  vertical-align: middle;
}

.checkbox-wrapper .path1 {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  opacity: 0;
  transition: 0.5s stroke-dashoffset;
}

.btn:hover > .icon path {
  fill: rgb(168 7 7);
}

.checkbox-wrapper .check:checked + label svg g path {
  stroke-dashoffset: 0;
  opacity: 1;
}

.streak {
  color: #5aa55e;
  font-weight: bold;
}

.btn {
  fill: var(--delete-button-color);
  position: relative;
  cursor: pointer;
  margin-right: 8px;
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
}

.btn::after {
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: 0.2s linear;
  transition-delay: 0.2s;
  border-radius: 5px;
  background-color: rgb(168 7 7);
  padding: 4px 8px;
  content: 'delete';
  color: white;
  font-size: 12px;
  text-transform: uppercase;
}

.icon {
  transform: scale(1.2);
  transition: 0.2s linear;
}

.btn:hover > .icon {
  transform: scale(1.5);
}

.btn:hover::after {
  top: -160%;
  visibility: visible;
  opacity: 1;
}
</style>
