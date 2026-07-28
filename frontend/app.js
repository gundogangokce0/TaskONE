const { createApp, ref, reactive } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// API Service
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const authService = {
    async login(payload) {
        const response = await axios.post(`${API_BASE_URL}/login/`, payload);
        return response.data;
    }
};

// 1. Auth Module - LoginForm Component (Vue 3 Composition API)
const LoginForm = {
    template: `
        <form @submit.prevent="handleSubmit" autocomplete="off">
            <div v-if="errorMessage" class="alert-box alert-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{{ errorMessage }}</span>
            </div>

            <div v-if="successMessage" class="alert-box alert-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>{{ successMessage }}</span>
            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <div class="input-wrapper">
                    <input 
                        id="username" 
                        v-model="form.username" 
                        type="text" 
                        class="form-control" 
                        placeholder="Enter your username" 
                        required 
                    />
                    <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </span>
                </div>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-wrapper">
                    <input 
                        id="password" 
                        v-model="form.password" 
                        :type="showPassword ? 'text' : 'password'" 
                        class="form-control" 
                        placeholder="••••••••" 
                        required 
                    />
                    <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </span>
                    <button type="button" class="toggle-password" @click="showPassword = !showPassword" title="Toggle Password">
                        <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <button type="submit" :disabled="loading" class="btn-submit">
                <span v-if="loading" class="spinner"></span>
                <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
        </form>
    `,
    setup() {
        const form = reactive({
            username: '',
            password: ''
        });

        const showPassword = ref(false);
        const loading = ref(false);
        const errorMessage = ref('');
        const successMessage = ref('');

        const handleSubmit = async () => {
            errorMessage.value = '';
            successMessage.value = '';

            if (!form.username || !form.password) {
                errorMessage.value = 'Please enter both username and password.';
                return;
            }

            loading.value = true;

            try {
                const res = await authService.login({
                    username: form.username,
                    password: form.password
                });

                if (res.access) {
                    localStorage.setItem('access_token', res.access);
                }
                if (res.refresh) {
                    localStorage.setItem('refresh_token', res.refresh);
                }
                if (res.user) {
                    localStorage.setItem('user_info', JSON.stringify(res.user));
                }

                successMessage.value = res.message || 'Login successful!';
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error) {
                    errorMessage.value = err.response.data.error;
                } else {
                    errorMessage.value = 'Unable to connect to backend server.';
                }
            } finally {
                loading.value = false;
            }
        };

        return {
            form,
            showPassword,
            loading,
            errorMessage,
            successMessage,
            handleSubmit
        };
    }
};

// 2. Auth Module - Login Page Component
const LoginPage = {
    components: {
        LoginForm
    },
    template: `
        <div class="login-wrapper">
            <div class="background-glow glow-1"></div>
            <div class="background-glow glow-2"></div>

            <div class="login-container">
                <div class="login-header">
                    <div class="brand-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Optimization Timetable Portal</p>
                </div>

                <login-form></login-form>
            </div>
        </div>
    `
};

// 3. Vue Router Configuration
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 4. Root App Component with Router View
const App = {
    template: `<router-view></router-view>`
};

// 5. Create and Mount Vue 3 Application
const app = createApp(App);
app.use(router);
app.mount('#app');
