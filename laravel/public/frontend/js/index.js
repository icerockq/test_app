const NotFound = { template: '<p>Страница не найдена</p>' }
const Home = { template: '<p>Главная страница</p>' }

const navBar = {
    methods: {
        logout () {            
            deleteCookie('userId');
            deleteCookie('hash');
            this.$router.push('/login');
        },
    },
    template : `
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">Админ панель</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template slot="button-content">
                    <em>Настройки</em>
                    </template>
                    <b-dropdown-item href="#" @click="logout">Выход</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>`
};

const Admin = { 
    data () {
        return {
            sortBy: 'id',
            sortDesc: false,
            fields: [
                {
                    key: 'id',
                    label: 'ID',
                    sortable: true
                },
                {
                    key: 'login',
                    label: 'Логин',
                    sortable: true
                },
                {
                    key: 'status',
                    label: 'Статус',
                    sortable: true,
                }
            ],
            isBusy: false
        }
    },
    methods: {
        myProvider (ctx) {
            var formData = new FormData(ctx);
            formData.append('sortBy', ctx.sortBy);
            formData.append('sortDesc', ctx.sortDesc);

            let promise = axios.post('/admin/datatable', formData)
        
            return promise.then((data) => {
                
                const items = data.data;
                console.log(items);
                return(items)
            }).catch(error => {
                return []
            })
        }
    },
    components: {
        'navbar' : navBar
    },
    template: `
            <div class="h-100">
                <navbar></navbar>
                <div class="container h-100">
                    <div class="row align-items-center justify-content-center h-100">
                        <b-table striped hover 
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc" 
                            :busy.sync="isBusy" 
                            :items="myProvider" 
                            :fields="fields">
                                <template slot="id" slot-scope="data">
                                    {{data.item.id}}
                                </template>
                                <template slot="login" slot-scope="data">
                                    {{data.item.login}}
                                </template>
                                <template slot="status" slot-scope="data">
                                <b-badge :variant="data.value.color">{{data.value.name}} </b-badge>
                                </template>
                        </b-table>
                    </div>
                </div>
            </div>` 
}
const Login = { 
    data () {
        return {
            form: {
                login: '',
                password: '',
            },
            errorMessage: '',
            stateAlert: false
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault();
            var formData = new FormData(this.form);
            formData.append('login', this.form.login);
            formData.append('password', this.form.password);
            
            let promise = axios.post('/login/auth', formData );
        
            return promise.then((data) => {
                let response = data.data;

                if(response.error == 0){
                    this.hideAlert();
                    setCookie('userId', response.user_id);
                    setCookie('hash', response.hash);
                    this.$router.push('/admin');

                }else if(response.error == 1){
                    this.showAlert(response.message);
                }
            }).catch(error => {
                return []
            })
            
            // setCookie('userId', 1);
            // this.$router.push('/admin');
            
        },
        showAlert (errorMessage) {
            this.stateAlert = true;
            this.errorMessage = errorMessage;
        },
        hideAlert() {
            this.stateAlert = false;
        }
    },
    template: `
        <div class="row align-items-center justify-content-center h-100">
            <b-form  @submit="onSubmit">
                <b-form-group 
                    label="Логин:">
                    <b-input v-model="form.login" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Login" />
                </b-form-group>
                <b-form-group 
                    label="Пароль:">
                    <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input v-model="form.password" type="password" placeholder="Password" />
                    </b-input-group>
                </b-form-group>
                <b-alert :show="stateAlert" variant="danger">{{errorMessage}}</b-alert>
                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">А ну ка запомни меня!</b-form-checkbox>
                <b-button type="submit" variant="primary">Войти</b-button>
            </b-form>
        </div>` 
}


function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};
function setCookie(name, value, options) {
    options = options || {};
  
    var expires = options.expires;
  
    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }
  
    value = encodeURIComponent(value);
  
    var updatedCookie = name + "=" + value;
  
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

const routes = [
    { path: '/', component: Home, meta: {title: 'Главная'} },
    { path: '/admin', component: Admin, meta: {title: 'Админ панель'} },
    { path: '/login', component: Login, meta: {title: 'Авторизация'}  }
];

const router = new VueRouter({
    mode: 'history',
    routes 
});

router.beforeEach((to, from, next) => {      
    let moduleParams = to.path.split('/');
    let typeUrl = moduleParams[1];    
    
    if(!this.getCookie('userId') && typeUrl != 'login'){
        next('/login');
    }else if(this.getCookie('userId')  && (typeUrl != 'admin')){
        next('/admin');
    }else{
        document.title = to.meta.title;
        next();
    }
})

const app = new Vue({
    router
}).$mount('#app');