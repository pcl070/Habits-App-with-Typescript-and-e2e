<template>
  <div class="edit-categories-page">
    <h2>Edit Categories</h2>
    <div class="frame">
      <!-- Add new category -->
      <div class="add-category-section">
        <input v-model="newCategoryName" placeholder="Enter new category" />
        <button @click="addCategory">Add Category</button>
      </div>

      <!-- List of existing categories with edit and delete options -->
      <ul class="categories-list">
        <li
          v-for="category in categories"
          :key="category"
          class="category-item"
        >
          <!-- Display category name or an input field based on editing state -->
          <div class="category-content">
            <span v-if="editingCategory !== category">{{ category }}</span>
            <input
              v-if="editingCategory === category"
              v-model="editedCategoryName"
            />
          </div>
          <div class="category-buttons">
            <button
              v-if="editingCategory !== category"
              @click="startEdit(category)"
            >
              Edit
            </button>
            <button
              v-if="editingCategory !== category"
              class="btn"
              @click="deleteCategory(category)"
            >
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
            <button
              v-if="editingCategory === category"
              @click="saveCategory(category)"
            >
              Save
            </button>
            <button v-if="editingCategory === category" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </li>
      </ul>

      <button @click="goBack" class="back-btn">Back to Homepage</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHabitStore } from '../stores';

export default {
  name: 'EditCategoriesPage',
  setup() {
    const router = useRouter();
    const habitStore = useHabitStore();

    // Reactive state with TypeScript annotations
    const categories = computed<string[]>(() => habitStore.categories);
    const newCategoryName = ref<string>('');
    const editingCategory = ref<string | null>(null);
    const editedCategoryName = ref<string>('');

    const addCategory = (): void => {
      if (newCategoryName.value.length > 25) {
        alert('Category name should be 25 characters or less!');
        return;
      }
      if (newCategoryName.value.trim()) {
        habitStore.addCategory(newCategoryName.value.trim());
        newCategoryName.value = '';
      }
    };

    const startEdit = (category: string): void => {
      editingCategory.value = category;
      editedCategoryName.value = category;
    };

    const saveCategory = (oldCategory: string): void => {
      if (editedCategoryName.value.length > 25) {
        alert('Category name should be 25 characters or less!');
        return;
      }
      if (
        editedCategoryName.value.trim() &&
        editedCategoryName.value !== oldCategory
      ) {
        habitStore.editCategory(oldCategory, editedCategoryName.value.trim());
      }
      editingCategory.value = null;
      editedCategoryName.value = '';
    };

    const cancelEdit = (): void => {
      editingCategory.value = null;
      editedCategoryName.value = '';
    };

    const deleteCategory = (category: string): void => {
      if (
        confirm(
          `Are you sure you want to delete the category "${category}"? This will delete all associated habits.`
        )
      ) {
        habitStore.deleteCategory(category);
      }
    };

    const goBack = (): void => {
      router.push({ name: 'Home' });
    };

    return {
      categories,
      newCategoryName,
      editingCategory,
      editedCategoryName,
      addCategory,
      startEdit,
      saveCategory,
      cancelEdit,
      deleteCategory,
      goBack,
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

h2 {
  font-family: Arial, Helvetica, sans-serif;
}

.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  box-shadow: #212121 5px 2px 10px;
  border: 2px solid #212121;
  border-radius: 15px;
  background: var(--light-elements-color);
  padding: 20px;
  width: 100%;
  max-width: 600px;
}

ul {
  min-width: 500px;
}

.edit-categories-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 95vh;
}

.add-category-section {
  margin-bottom: 20px;
}

.add-category-section input {
  box-shadow: #212121 2px 2px 5px;
  border: 1px solid var(--buton-bord-color);
  border-radius: 15px;
  padding: 8px;
}

.categories-list {
  padding: 0;
  list-style-type: none;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.category-content {
  flex-grow: 1;
  border-bottom: 1px solid var(--buton-bord-color);
  padding-bottom: 8px;
}

.category-content input {
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 17px;
}

.category-content input:focus-visible {
  outline: none;
  border: none;
}

.category-buttons {
  display: flex;
}

button {
  transition: ease 0.3s;
  margin: 0 10px;
  box-shadow: #212121 2px 2px 5px;
  border: 1px solid var(--buton-bord-color);
  border-radius: 15px;
  padding: 8px 12px;
}

button:hover {
  cursor: pointer;
}
</style>
