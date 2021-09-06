package com.route;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.paymentez.android.Paymentez;
import com.paymentez.android.model.Card;
import com.paymentez.android.rest.TokenCallback;
import com.paymentez.android.rest.model.PaymentezError;
import com.paymentez.android.view.CardMultilineWidget;

public class MyViewManager extends SimpleViewManager<LinearLayout> {
    Button btn;
    public static final String REACT_NAME="MyViewManager";
    public static ReactNativeHost mReactNativeHost;
//    public int COMMAND_CREATE=1;
    ReactApplicationContext reactContext;
    private String user_id="1";
    private String user_email="user@gmail.com";
    private ReactApplicationContext context;
    public MyViewManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        user_id=PaymentezCustomModule.user_id;
        user_email=PaymentezCustomModule.email;
        //Log.d("test",user_id+"");
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_NAME;
    }

    public void callback(String token,String cardType,String sessionId,String lastFour){
        WritableMap payload = Arguments.createMap();
        // Put data to map
        payload.putString("token", token);
        payload.putString("cardType", cardType);
        payload.putString("sessionId", sessionId);
        payload.putString("lastFourDigit", lastFour);

        // Emitting event from java code
        (mReactNativeHost.getReactInstanceManager().getCurrentReactContext()).getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("MyCustomEvent", payload);
    }




    public LinearLayout createViewInstance(ThemedReactContext context) {
        LayoutInflater inflater =(LayoutInflater) reactContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        LinearLayout linearLayout = (LinearLayout) inflater.inflate(R.layout.fragment_face_capture,null);
//        CardMultilineWidget card=linearLayout.findViewById(R.id.card_multiline_widget);
//        linearLayout.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Toast.makeText(context,"Hey I am clicked",Toast.LENGTH_LONG).show();
//            }
//        });
       // Paymentez.setEnvironment(true, Constan,"");
       // Log.d("childCount",""+linearLayout.getChildCount());
        Paymentez.setEnvironment(true, "IOS-CO-CLIENT", "AKKqsezFDHtanNv1G0ARyxb8DiYARE");
        linearLayout.getChildAt(0);
        Log.d("test_child_count",linearLayout.getChildCount()+"");
        btn=linearLayout.findViewById(R.id.btn);
        CardMultilineWidget card= (CardMultilineWidget) linearLayout.getChildAt(0);
        Card cardToSave = card.getCard();
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Card cardToSave = card.getCard();
                if (cardToSave == null) {
                    Log.d("test" , " if");
                    //return linearLayout; //If your customview has more constructor parameters pass it from here.
                }else{

//                    user_id=PaymentezCustomModule.name;
//                    user_email=PaymentezCustomModule.location;

                    user_id=PaymentezCustomModule.user_id;
                    user_email=PaymentezCustomModule.email;

                    Log.d("test",user_id+"");
                    Paymentez.addCard(reactContext,user_id ,user_email, cardToSave, new TokenCallback() {
                        @Override
                        public void onError(PaymentezError error) {
                            Log.d("test" , error+"");
                        }

                        @Override
                        public void onSuccess(Card card) {
//                            WritableMap payload = Arguments.createMap();
//                            // Put data to map
//                            payload.putString("MyCustomEventParam", "12345");
//
//                            MainActivity mainClass = new MainActivity();
//                            mainClass.emitter(payload);

                            // Emitting event from java code
                            Log.d("test" , card.getToken()+"");
                            Log.d("test" , card.getLast4()+"");
                            Log.d("test" , card.getType()+"");
                            Log.d("test" , Paymentez.getSessionId(reactContext)+"");
                            callback(card.getToken(),card.getType(),Paymentez.getSessionId(reactContext)+"",card.getLast4());
                        }
                    });

                }
            }
        });

        return linearLayout;
    }

}
