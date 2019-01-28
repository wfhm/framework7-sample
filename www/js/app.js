// Dom7
var $$ = Dom7;

function initPushwoosh() {
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");
    
    
    //set push notifications handler
    document.addEventListener('push-notification',
                              function(event) {
                              var message = event.notification.message;
                              var userData = event.notification.userdata;
                              
                              alert(message);
                              //dump custom data to the console if it exists
                              if (typeof(userData) != "undefined") {
                              console.warn('user data: ' + JSON.stringify(userData));
                              }
                              }
                              );
    
    document.addEventListener('push-receive',
                              function (event) {
                              var message = event.notification.message;
                              var userData = event.notification.userdata;
                              
                              alert(message);
                              //dump custom data to the console if it exists
                              if (typeof (userData) != "undefined") {
                              console.warn('user data: ' + JSON.stringify(userData));
                              }
                              }
                              );
    
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({
                                   projectid: "GOOGLE_PROJECT_ID",
                                   appid: "PUSHWOOSH_APP_ID",
                                   serviceName: ""
                                   });
    
    //register for push notifications
    pushNotification.registerDevice(
                                    function(status) {
                            
                                    },
                                    function(status) {
                                    alert("failed to register: " + status);
                                    console.warn(JSON.stringify(['failed to register ', status]));
                                    }
                                    );
}

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  on: {
    init: function () {
        initPushwoosh();
    }
  },
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});
