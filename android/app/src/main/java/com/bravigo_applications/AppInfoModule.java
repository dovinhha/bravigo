package com.bravigo_applications;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.List;

import android.util.Log;

public class AppInfoModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public AppInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppInfo";
    }

    @ReactMethod
    public void getAppVersion(String packageName, Promise promise) {
        try {
            PackageManager packageManager = reactContext.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(packageName, 0);
            String appVersion = packageInfo.versionName;
            promise.resolve(appVersion);
        } catch (Exception e) {
            promise.reject("ERROR GET VERSION APP", e.getMessage());
        }
    }
}