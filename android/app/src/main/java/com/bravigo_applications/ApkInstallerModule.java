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
// import java.nio.file.spi.FileSystemProvider;
import androidx.core.content.FileProvider;

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
                File file = new File(filePath);
                // apkUri = FileProvider.getUriForFile(reactContext, reactContext.getApplicationContext().getPackageName() + ".provider",file);
                // apkUri = Uri.fromFile(file);

                String packageName = reactContext.getApplicationContext().getPackageName();
                String authority = packageName + ".provider";

                apkUri = FileProvider.getUriForFile(reactContext, authority,file);

                Log.d("App Installer", "App Installer apkUri: " + apkUri);
                Log.d("App Installer", "App Installer file: " + file);

                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.putExtra(Intent.EXTRA_NOT_UNKNOWN_SOURCE, true);
            } else {
                // For devices running on older versions of Android
                Log.d("App Installer", "App Installer: else");
                apkUri = Uri.fromFile(new File(Environment.getExternalStorageDirectory().getPath() + filePath));
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            }

            // Start the installation activity
            getCurrentActivity().startActivity(Intent.createChooser(intent, "Open_Apk"));

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("INSTALL_FAILED", e.getMessage());
        }
    }
}