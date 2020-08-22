# SpellCaster
A React Native app that allows you to cast spells to your ChromeCast!

#### Project Requirements
- Enable watching videos, with optional fullscreen
- Casting support
- 1 or 2 animations while switching screens

### Up and Running
```yarn install``` or ```npm install``` if using npm
- Jetifier will run postinstall, but running ```npx jetifier``` as a sanitity check.
- Open with Android Studio
- Select Emulator (or physical device if you have it)
- Ensure that gradle has been synced and everything checks out
- Click the play button to run!

### Project layout
┣ src
 ┃ ┣ /components
 ┃ ┣ /casting
 ┃ ┣ /common
 ┃ ┣ /video-list
 ┃ ┗ /video-player
 ┣ /hooks
 ┣ /screens
 ┣ /utils
 ┣ RootNavigator.js
 ┣ index.js
 ┣ store.js
 ┣ theme.js
 ┗ videoData.json

### How it works
The app essentially revolves 1 part. If there is a connected chromecast device, show optional parts when actually watching the video.
- if casting is available
    - use a 'youtube' style version of showing that you're casting your video to the chromecast. while bringing a media control to the front with the option of dismissing the controls
- if casting isn't available
    - display the screen video as normal, but still offer the option to cast to the chromecast

### Todo/@dev
- Stay up to date with react-native-google-cast to make sure that when v4 comes out, the project isn't using a 'hacked' implementation. The current setup is not a really solid way of handling it I feel and seems a little brittle.
- react-native-video falls in somewhat of the same boat. Having to pull master to get some of the latest features merged in (there were issues with the playbutton disappearing and fullscreen mode).
