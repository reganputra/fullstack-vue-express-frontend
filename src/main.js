import { createApp } from 'vue'

import App from './App.vue'

// Import the router
import routes from './routes'

//create App Vue
const app = createApp(App);

//use the router
app.use(routes);

//mount the app
app.mount('#app');