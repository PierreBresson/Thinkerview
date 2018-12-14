package com.thinkerview;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.guichaguri.trackplayer.TrackPlayer;
import com.rpt.reactnativecheckpackageinstallation.CheckPackageInstallationPackage;
import cl.json.RNSharePackage;
<<<<<<< HEAD
=======
import com.RNFetchBlob.RNFetchBlobPackage;
>>>>>>> ac39fb70068ccdb8b8026517f948307064cf54cb
import com.oblador.vectoricons.VectorIconsPackage;
import com.rpt.reactnativecheckpackageinstallation.CheckPackageInstallationPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
<<<<<<< HEAD
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new TrackPlayer(), new RNSharePackage(),
=======
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new TrackPlayer(), new RNFetchBlobPackage(), new RNSharePackage(),
>>>>>>> ac39fb70068ccdb8b8026517f948307064cf54cb
          new VectorIconsPackage(), new CheckPackageInstallationPackage(), new ReactNativeYouTube());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false); 
  }
}
