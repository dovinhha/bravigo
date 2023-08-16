package com.bravigo_applications;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;

import java.io.File;
import java.nio.file.spi.FileSystemProvider;

public class ApkInstallerModule extends ReactContextBaseJavaModule {
private final ReactApplicationContext reactContext;
    public ApkInstallerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ApkInstaller";
    }

    @ReactMethod
    public void installApk(String filePath, Promise promise) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            Uri apkUri;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                // For devices running on Android Nougat (7.0) and above
                Log.d("App Installer", "App Installer: if");
                apkUri = Uri.fromFile(new File(filePath));
                apkUri = FileSystemProvider.getUriForFile(reactContext, reactContext.getApplicationContext().getPackageName() + ".provider","content:///storage/emulated/0/Download/1692186820_10g08p_16_08_2023-3107oes.apk");
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } else {
                // For devices running on older versions of Android
                Log.d("App Installer", "App Installer: else");
                apkUri = Uri.fromFile(new File(Environment.getExternalStorageDirectory().getPath() + filePath));
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            }

            // Start the installation activity
            getCurrentActivity().startActivity(intent);

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("INSTALL_FAILED", e.getMessage());
        }
    }
}