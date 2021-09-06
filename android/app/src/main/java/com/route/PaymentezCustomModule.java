package com.route;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class PaymentezCustomModule extends ReactContextBaseJavaModule {
    PaymentezCustomModule(ReactApplicationContext context) {
        super((context));
    }

    @NonNull
    @Override
    public String getName() {
        return "PaymentezCustomModule";
    }

    static String user_id,email;

    @ReactMethod
    public void passValue(String user_id, String email, Callback promise) {
        //Log.d("CalendarModule", "Create event called with name: " + name + " and location: " + location);
        this.user_id=user_id;
        this.email=email;
        promise.invoke(user_id + email);
    }

}
