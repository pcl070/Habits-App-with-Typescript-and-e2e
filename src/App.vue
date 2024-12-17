<template>
  <header>
    <label class="switch">
      <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" />
      <span class="slider"></span>
    </label>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width="50px"
      height="50px"
      viewBox="0 0 512 512"
      class="logo"
    >
      <g id="meditation">
        <path
          d="M478.6382,307.0278a25.3168,25.3168,0,0,0-6.6006-11.6929,26.6505,26.6505,0,0,0-20.2-7.8154,17.6791,17.6791,0,0,0-11.0093,3.2386,11.51,11.51,0,0,0-7.93-1.6736,19.7512,19.7512,0,0,0-14.2724,9.4951,23.8481,23.8481,0,0,0-1.5957,22.6889l-22.3545,0c-12.5713,0-21.2647-2.8194-26.5772-8.6187-9.5732-10.4526-7.8281-30.3179-6.14-49.5288.58-6.6069,1.1807-13.4375,1.27-19.71.7852-15.58-4.0986-28.813-14.5166-39.332-24.2155-24.4509-71.5585-26.7479-87.5931-26.7935-2.6249-.0075-7.1433.0064-9.2073,0-14.93-.0465-63.8656,1.7954-88.6244,26.7935-10.418,10.519-15.3018,23.7515-14.5166,39.332.09,6.2725.69,13.103,1.2705,19.71,1.6885,19.2109,3.4346,39.0757-6.14,49.5278-5.3125,5.8-14.0059,8.6192-26.5772,8.6192l-22.3545,0A23.8508,23.8508,0,0,0,93.3755,298.58a19.7535,19.7535,0,0,0-14.2715-9.4947A11.5122,11.5122,0,0,0,71.6,290.4976,27.8313,27.8313,0,0,0,60.5464,287.54a26.6612,26.6612,0,0,0-20.584,7.7949,25.3316,25.3316,0,0,0-6.6006,11.6919c-3.9209,14.1441,1.6455,29.605,13.8516,38.4722C61.3384,355.76,82.56,369.1413,111.34,374.4907a78.6638,78.6638,0,0,0-12.6355,40.0986c-.0234.793-.0352,7.7476-.0352,7.7476a55.71,55.71,0,0,0,55.71,55.71H357.6206a55.7114,55.7114,0,0,0,55.71-55.71s-.0118-6.9546-.0352-7.7461a77.8619,77.8619,0,0,0-12.5478-39.969c27.7592-5.264,51.373-19.9215,64.039-29.1228C476.9927,336.6318,482.5591,321.1709,478.6382,307.0278ZM457.7339,335.79C443.87,345.8623,415.96,362.9834,384.811,364.4824l.0039.0837c-8.6264-2.3568-18.6245-3.9147-29.6848-5.636q-3.1652-.495-6.48-1.02a39.1961,39.1961,0,0,1-22.05-11.19,28.264,28.264,0,0,1-7.63-13.67c-1.83-8.47-.87-26.96,2.65-50.75a5.9992,5.9992,0,0,0-11.87-1.75c-2.67,18.06-5.27,42.27-2.51,55.04a40.0942,40.0942,0,0,0,10.72,19.46,51.3247,51.3247,0,0,0,28.81,14.71q3.345.525,6.52,1.02c15.7168,2.4433,27.2823,4.4077,35.5826,7.6975A66.2511,66.2511,0,0,1,401.3013,414.94c.0195.6768.0293,7.397.0293,7.397a43.7114,43.7114,0,0,1-43.71,43.71H309.8833V438.041c0-7.7894-2.3589-14.0455-6.3953-18.8357h31.7093a6,6,0,0,0,0-12H182.31a6,6,0,1,0,0,12h89.5678c14.3394,0,26.0054,4.4963,26.0054,18.8357v28.0063H154.3794a43.71,43.71,0,0,1-43.71-43.71s.01-6.72.0293-7.3984a66.8868,66.8868,0,0,1,12.3633-36.3753c8.34-3.4363,20.0869-5.4375,36.188-7.9431q3.18-.495,6.51-1.02a51.3231,51.3231,0,0,0,28.81-14.71,40.0874,40.0874,0,0,0,10.72-19.47c2.77-12.77.17-36.98-2.5-55.04a5.9991,5.9991,0,1,0-11.87,1.75c3.51,23.79,4.48,42.29,2.64,50.75a28.244,28.244,0,0,1-7.62,13.67,39.1942,39.1942,0,0,1-22.06,11.19q-3.3149.525-6.48,1.02c-11.19,1.7479-21.2829,3.3208-29.9919,5.74-.0207-.0018-.04-.0061-.061-.0076C94.1831,362.0166,70.8706,347.853,54.2661,335.79a23.9849,23.9849,0,0,1-9.34-25.5566,15.6294,15.6294,0,0,1,3.372-6.2656A13.4444,13.4444,0,0,1,60.06,299.53a16.1392,16.1392,0,0,1,5.7558,1.4957,6.8285,6.8285,0,0,1-1.664,4.1053c-.292.2647-1.1954,1.0659-3.8389.8731a6,6,0,1,0-.8867,11.9668c6.5215.4883,10.624-1.9439,12.9121-4.0655,5.001-4.6367,5.4551-11.3652,5.4931-12.86a7.8259,7.8259,0,0,1,5.2979,3.7817c2.7158,4.4541,2.6435,8.9307-.22,13.6851a9.7044,9.7044,0,0,0-.1231,9.7671,9.8257,9.8257,0,0,0,8.5381,4.9892l26,0c15.4148,0,26.6738-3.7512,34.3745-11.4369A10.0055,10.0055,0,0,1,153.28,324.55a5.9972,5.9972,0,0,0,11.17-4.37,21.5793,21.5793,0,0,0-5.8023-8.4062c6.4747-14.118,4.8309-32.8252,3.3477-49.7036-.5908-6.7246-1.1484-13.0762-1.2275-18.9341l-.0069-.2324c-.6406-12.2788,2.97-22.2119,11.0391-30.3662,21.3992-21.6268,67.0345-23.2407,80.2767-23.2348,2.2657.001,5.561.0026,7.7972.0012,13.1817-.0081,58.9022,1.5814,80.3255,23.2331,8.0693,8.1548,11.68,18.0879,11.0391,30.3667l-.0069.2324c-.0791,5.8574-.6367,12.209-1.2275,18.9336-1.4829,16.8767-3.1265,35.5814,3.3452,49.6989a21.5845,21.5845,0,0,0-5.81,8.4114,5.9972,5.9972,0,1,0,11.17,4.37,9.9882,9.9882,0,0,1,1.5927-2.7167c7.7007,7.6842,18.959,11.4347,34.3726,11.4347l26.001,0a9.8258,9.8258,0,0,0,8.5371-4.9878,9.7071,9.7071,0,0,0-.1221-9.7685c-2.8642-4.7549-2.9355-9.2315-.22-13.6856a7.8248,7.8248,0,0,1,5.32-3.7861c.4756,6.3716,4.9228,15.62,15.4287,15.62a6,6,0,0,0,0-12c-1.8935,0-2.7588-1.5453-3.1533-2.8913,1.8232-2.17,5.6582-2.2478,5.6582-2.2478a14.8136,14.8136,0,0,1,11.5771,4.4472,13.5878,13.5878,0,0,1,3.3711,6.2642A23.9853,23.9853,0,0,1,457.7339,335.79Z"
        />

        <path
          d="M256.1249,168.103c27.2285,0,49.38-21.0122,49.38-46.84s-22.1514-46.84-49.38-46.84-49.38,21.0122-49.38,46.84S228.8964,168.103,256.1249,168.103Zm0-81.68c20.6113,0,37.38,15.6289,37.38,34.84s-16.7686,34.84-37.38,34.84-37.38-15.6289-37.38-34.84S235.5136,86.4233,256.1249,86.4233Z"
        />

        <path
          d="M251.079,124.8013a5,5,0,1,0-7.0654-7.0762c-3.64,3.6358-6.95,1.544-8.6035-.0317a5,5,0,0,0-7.0337,7.1079,17.0571,17.0571,0,0,0,11.6435,4.9258A15.4009,15.4009,0,0,0,251.079,124.8013Z"
        />

        <path
          d="M272.8129,129.7271a15.4023,15.4023,0,0,0,11.06-4.9258,5,5,0,0,0-7.0655-7.0762c-3.6406,3.6358-6.95,1.544-8.603-.0312a5,5,0,0,0-7.0342,7.1074A17.0583,17.0583,0,0,0,272.8129,129.7271Z"
        />

        <path
          d="M256.1234,242.8827c3.3829-4.7314,8.9876-9.6729,14.0064-13.0889a55.9388,55.9388,0,0,0-7.4287-13.7741,8.0619,8.0619,0,0,0-13.0225,0,55.6757,55.6757,0,0,0-7.4509,13.84C247.1913,233.2761,252.7738,238.2175,256.1234,242.8827Z"
        />

        <path
          d="M291.0382,230.5413c-29.62,5.2476-34.3542,28.0581-34.9138,38.7764-.5591-10.7183-5.2937-33.5288-34.9136-38.7764a7.29,7.29,0,0,0-8.4562,8.2033c5.7307,39.2486,43.37,37.2571,43.37,37.2571s37.6394,1.9915,43.37-37.2571A7.29,7.29,0,0,0,291.0382,230.5413Z"
        />

        <path
          d="M256.058,61.2153a6,6,0,0,0,6-6V39.9527a6,6,0,1,0-12,0V55.2153A6,6,0,0,0,256.058,61.2153Z"
        />

        <path
          d="M315.7377,98.8218a5.9735,5.9735,0,0,0,2.5747-.584l13.7818-6.5591a6,6,0,0,0-5.1573-10.8349l-13.7817,6.559a6.0008,6.0008,0,0,0,2.5825,11.419Z"
        />

        <path
          d="M180.6415,90.4331l13.6611,6.8062a6,6,0,0,0,5.3516-10.7412l-13.6611-6.8062a6,6,0,1,0-5.3516,10.7412Z"
        />

        <path
          d="M287.1532,71.2368a5.9994,5.9994,0,0,0,8.378-1.3466L304.474,57.522a6,6,0,0,0-9.7246-7.0313l-8.9428,12.3682A6.0006,6.0006,0,0,0,287.1532,71.2368Z"
        />

        <path
          d="M218.2157,68.5864a6,6,0,1,0,9.9688-6.68l-8.4961-12.6792a6,6,0,0,0-9.9688,6.68Z"
        />
      </g>
    </svg>
    <!-- Reset Data Button -->
    <button @click="confirmResetData" class="reset-button">
      <span class="reset-text">Reset All Data</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        viewBox="0 0 25 25"
        fill="none"
        class="reset-icon"
      >
        <path
          d="M4.56189 13.5L4.14285 13.9294L4.5724 14.3486L4.99144 13.9189L4.56189 13.5ZM9.92427 15.9243L15.9243 9.92427L15.0757 9.07574L9.07574 15.0757L9.92427 15.9243ZM9.07574 9.92426L15.0757 15.9243L15.9243 15.0757L9.92426 9.07574L9.07574 9.92426Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </header>
  <router-view />
</template>

<script lang="ts">
// @ts-ignore
import { ref, onMounted, type Ref } from 'vue';
import { useHabitStore } from './stores';

export default {
  name: 'App',
  setup() {
    const habitStore = useHabitStore();

    // Dark mode state
    const darkMode: Ref<boolean> = ref(false);

    // Initialize dark mode based on localStorage value
    onMounted(() => {
      habitStore.initLocalStorage();
      // @ts-ignore
      const storedMode = localStorage.getItem('darkMode');
      if (storedMode === 'enabled') {
        darkMode.value = true;
        // @ts-ignore
        document.documentElement.classList.add('dark');
      }
    });

    const toggleDarkMode = (event: Event): void => {
      // @ts-ignore
      const target = event.target as HTMLInputElement;
      darkMode.value = target.checked;

      if (darkMode.value) {
        // @ts-ignore
        document.documentElement.classList.add('dark');
        // @ts-ignore
        localStorage.setItem('darkMode', 'enabled');
      } else {
        // @ts-ignore
        document.documentElement.classList.remove('dark');
        // @ts-ignore
        localStorage.setItem('darkMode', 'disabled');
      }
    };

    // Function to reset all user data with confirmation
    const confirmResetData = (): void => {
      if (
        // @ts-ignore
        confirm(
          'Are you sure you want to reset all data? This action cannot be undone.'
        )
      ) {
        resetData();
      }
    };

    // Function to reset data
    const resetData = (): void => {
      habitStore.$reset(); // Reset all data in Pinia store
      // @ts-ignore
      localStorage.clear(); // Clear all local storage
      // @ts-ignore
      document.documentElement.classList.remove('dark'); // Remove dark mode class
      darkMode.value = false; // Reset dark mode toggle
    };

    return {
      darkMode,
      toggleDarkMode,
      confirmResetData,
    };
  },
};
</script>

<style>
body {
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0;
  background: var(--light-background-color);
  background-repeat: no-repeat;
  min-height: 100vh;
  color: var(--text-color);
  font-family: Arial, Helvetica, sans-serif;
}

:root {
  --light-background-color: linear-gradient(
    18deg,
    rgb(130 114 201) 0%,
    rgb(152 131 209) 12%,
    rgb(109 100 156) 35%,
    rgb(174 125 172 / 100%) 67%,
    rgb(243 218 223 / 100%) 100%
  );
  --light-elements-color: linear-gradient(
    90deg,
    rgb(181 174 218) 4%,
    rgb(235 188 233) 94%
  );
  --text-color: #000;
  --button-bg-color: #f3dadf;
  --button-text-color: #000;
  --logo-color: #000;
  --delete-button-color: #000;
  --buton-bord-color: #212121;
}

html.dark {
  --background-color: linear-gradient(
    18deg,
    rgb(12 12 13 / 100%) 0%,
    rgb(20 22 27 / 100%) 12%,
    rgb(40 39 42 / 100%) 35%,
    rgb(34 34 34 / 100%) 67%,
    rgb(8 8 8 / 100%) 100%,
    rgb(24 24 24 / 100%) 100%
  );
  --light-elements-color: linear-gradient(
    90deg,
    rgb(15 15 15) 4%,
    rgb(36 31 33) 94%
  );
  --text-color: #fff;
  --button-bg-color: #444;
  --button-text-color: #fff;
  --logo-color: #fff;
  --delete-button-color: #fff;
  --buton-bord-color: #fff;
}

html.dark body {
  background: var(--background-color);
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  background-color: #0000002c;
  padding: 0 15px;
  min-height: 65px;
  max-height: 65px;
}

.logo {
  transition: fill 0.3s ease;
  margin: 0 auto;
}

.logo #meditation path {
  fill: var(--logo-color);
  transition: fill 0.3s ease;
}

button,
input,
select {
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
}

.switch {
  --width-of-switch: 3.5em;
  --height-of-switch: 2em;

  position: relative;
  margin-right: auto;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  transition: 0.4s;
  cursor: pointer;
  inset: 0;
  border-radius: 30px;
  background-color: #f4f4f5;
}

.slider::before {
  position: absolute;
  top: 50%;
  left: 0.3em;
  transform: translateY(-50%);
  transition: 0.4s;
  border-radius: 20px;
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
  width: 1.4em;
  height: 1.4em;
  content: '';
}

input:checked + .slider {
  background-color: #303136;
}

input:checked + .slider::before {
  left: calc(100% - 1.7em);
  box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
  background: #303136;
}

.reset-button {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-left: auto;
  border: none;
  border-radius: 5px;
  background-color: #ff4d4d;
  padding: 4px 20px;
  max-height: 35px;
  color: white;
  font-weight: bold;
}

.reset-button:hover {
  background-color: #e60000;
}

.reset-icon {
  fill: currentcolor;
  display: none;
}

@media (width <= 800px) {
  .reset-text {
    display: none;
  }

  .reset-icon {
    display: inline;
  }
}

.habit-item {
  margin-bottom: 10px;
  box-shadow: #212121 3px 3px 5px;
  border: #212121 solid 1px;
  border-radius: 15px;
  background: var(--light-elements-color);
  padding: 10px;
}
</style>
