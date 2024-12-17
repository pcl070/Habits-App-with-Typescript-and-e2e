# Habit Tracker App
This project is a Habit Tracker web application built using Vue 3 and Pinia for state management. It enables users to add, categorize, track, and manage daily habits, with the option to view progress visually and review habit streaks.

## Features
### Core Functionalities
- Add and Delete Habits: Create new habits and remove habits when no longer needed.
- Categorize Habits: Organize habits by custom categories (e.g., Health, Work, Hobbies).
- Track Habit Streaks: See streaks for consecutive habit completions.
- Pagination: View habits in a paginated format for easy navigation when managing a large list of habits.
### Date Management
- Calendar Integration: Select dates via an interactive calendar, where:
-- Dates in the future are disabled.
-- URLs cannot load invalid or future dates (e.g., /day/9999-12-12). Invalid dates redirect to today's date.
- Progress Visualization: A circular progress indicator shows the completion rate of habits for any given day.
### State Management and Persistence
- Local Storage: All data (habits, categories, completed habits, settings) persists across sessions using localStorage.
- Pinia Store: Manage app state (habits, completed days, categories, etc.) efficiently.
### Dark Mode Toggle
Switch between light and dark themes. Your preference is saved locally for a consistent experience.

## Tech Stack
- Vue 3: Progressive JavaScript framework for building the app UI.
- Pinia: Simple and modern state management for Vue.
- Vue Router: Handle client-side routing and prevent invalid date URLs.
- Day.js: Lightweight library for date manipulation.
- Vite: Fast build tool for modern web projects.
- Vitest: Unit testing framework for robust component testing.
- Playwright: End-to-end testing for app functionality.
## Installation
To set up and run this project locally:

1. Clone this repository:

```
git clone https://github.com/pcl070/Habits-App-with-Typescript-and-e2e.git
```
2. Navigate to the project folder:

```
cd habit-tracker-app
```
3. Install dependencies:

```
npm install
```
4. Run the app:

```
npm run dev
```

The app should now be running on http://localhost:3000.

## Project Structure
- components: Contains reusable UI components such as HabitItem and Calendar.
- views: Main application views, including the homepage and category editor.
- stores: Contains the Pinia store (useHabitStore) to manage application state.
## Usage
### Adding a New Habit
1. Enter a habit name in the input field (limited to 25 characters).
2. Select a category from the dropdown menu.
3. Click the "Add Habit" button to add the new habit.
### Editing and Deleting Categories
1. Go to the "Edit Categories" section.
2. Click "Edit" next to a category to update its name (limited to 25 characters).
3. Click "Save" to apply changes or "Cancel" to discard.
4. Click "Delete" to remove a category and all associated habits.
### Dark Mode
Click the dark mode toggle switch to switch between light and dark themes. This setting is saved and will persist across sessions.


## Testing
### Run Unit Tests (Vitest)
```
npx vitest
```
### Run End-to-End Tests (Playwright)
Ensure the development server is running:

```
npx playwright test
```
## Contributing
Feel free to fork this project and make your modifications. Contributions are welcome!

1. Fork the repository
2. Create a new branch:
```
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```
git commit -m "Add new feature"
```
4. Push to your branch:
```
git push origin feature/your-feature-name
```
5. Open a Pull Request on GitHub.
## Acknowledgments
- Vue.js: For the modern and efficient frontend framework.
- Pinia: For seamless state management.
- Day.js: For reliable date handling.
- Playwright: For robust end-to-end testing.
- Vitest: For unit testing.

## Notes:
- I emphasized new functionality (invalid/future date prevention).
- The test setup using Vitest and Playwright is highlighted for clarity.
- The updated structure includes e2e tests and the router fixes.
