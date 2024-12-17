import { render, fireEvent, cleanup } from '@testing-library/vue';
import { describe, it, expect, beforeEach } from 'vitest';
import HabitItem from './HabitItem.vue';

describe('HabitItem.vue', () => {
  it('emits "toggle-completion" event when checkbox is clicked', async () => {
    const habit = { id: 1, name: 'Exercise' };

    const { getByTestId, emitted } = render(HabitItem, {
      props: {
        habit,
        isCompleted: false,
        streak: 0,
      },
    });

    // Find the checkbox element
    const checkbox = getByTestId('habit-checkbox');

    await fireEvent.click(checkbox);

    expect(emitted()['toggle-completion']).toBeTruthy();
    expect(emitted()['toggle-completion'][0]).toEqual([habit.id]);
  });

  it('emits "delete-habit" event when delete button is clicked', async () => {
    const habit = { id: 1, name: 'Exercise' };

    const { getByTestId, emitted } = render(HabitItem, {
      props: {
        habit,
        isCompleted: false,
        streak: 0,
      },
    });

    // Find the delete button
    const deleteButton = getByTestId('delete-habit-btn');

    await fireEvent.click(deleteButton);

    expect(emitted()['delete-habit']).toBeTruthy();
    expect(emitted()['delete-habit'][0]).toEqual([habit.id]);
  });
});

describe('Streak Test', () => {
  beforeEach(() => {
    cleanup(); // Clean up the DOM before each test
  });

  it('displays the streak when it is greater than 2', async () => {
    const habit = { id: 1, name: 'Exercise' };

    // Render the component with streak > 2
    const { getByTestId } = render(HabitItem, {
      props: {
        habit,
        isCompleted: false,
        streak: 3,
      },
    });

    const streakDisplay = getByTestId('habit-streak');
    expect(streakDisplay).toBeVisible();
    expect(streakDisplay.textContent).toContain('🔥 3 days');
  });

  it('does not display the streak when it is 2 or less', async () => {
    const habit = { id: 1, name: 'Exercise' };

    const { queryByTestId } = render(HabitItem, {
      props: {
        habit,
        isCompleted: false,
        streak: 2,
      },
    });

    const streakDisplay = queryByTestId('habit-streak');
    expect(streakDisplay).toBeNull();
  });
});
