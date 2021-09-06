package com.route;

import android.content.Context;
import android.widget.LinearLayout;

public class CustomViewManager extends LinearLayout {
    private Context context;
    public CustomViewManager (Context context) {
        super(context);//ADD THIS
        this.context = context;
    }

    public void init() {
        inflate(context,R.layout.fragment_face_capture,this);
    }
}
