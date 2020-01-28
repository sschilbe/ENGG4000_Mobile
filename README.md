# ENGG4000-Mobile

## Setup
  - Install NPM if you don't currently have it installed (https://www.npmjs.com/get-npm)
  - Clone this Github repo (https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
  - Install VS code or another editor of your choice (https://code.visualstudio.com/)
    - VS code lets you install plugins that do syntax highlighting for different programming languages, you'll want to install:
      - GraphQL is like SQL (databases), this is what the Amazon database schema is defined using (https://marketplace.visualstudio.com/items? itemName=Prisma.vscode-graphql)
      - Ionic 4 Snippets, will help with autocomplete (https://marketplace.visualstudio.com/items?itemName=fivethree.vscode-ionic-snippets)
  - In a terminal window in the ./client folder for this project run `npm install` this will install all of the packages needed for the project
  - Plug in an Android device to your computer and enable developer mode (https://www.howtogeek.com/129728/how-to-access-the-developer-options-menu-and-enable-usb-debugging-on-android-4.2/)
  - Afterwards run `ionic cordova run android -l`, this will start the Ionic application on the Android device (This takes up to a minute so be patient). The `-l` option enables "Live Reloading" so that any changes made and saved in the code will automatically show up in the app
  
## Tips and Tricks
  - We are using Ionic 4 (when you are googling try and find Ionic 4 examples because other examples may not be accurate)
  - Ionic 4 project structure (https://ionicframework.com/docs/v3/intro/tutorial/project-structure/)
  - Ionic defines commands for creating new parts of the app (https://ionicframework.com/docs/cli/commands/generate)
  - Ionic uses Angular (another framework) packages and events, this is important because the events are triggered when different things happen like switching tabs (https://ionicframework.com/docs/angular/lifecycle)
  
## What's in the Project
**Client**  
    \-> **Amplify** (This contains generated files for the AWS amazon cloud services)  
   ...  
   \-> **src** (This is where all the magic happens, here is where the code is written)  
     \-> **app** (Defines the majority of the Typescript code that we are writing)  
       \-> **classes** (These are what defines the format of the data)  
       \-> **services** (Different functional elements with a single functionality, included in pages)  
       \-> **tab(1-3)** (Individual tabs for the application)  
       \-> **tabs** (Manages the 3 tabs for the app and switching between them)  
       
## Functionality
### Tab 1 - Live Data
  - Shows live force data interpretted from the connected Wearable on the heatmap (no values if no wearable connected)
  - Also shows the live IMU data in the form of a cylinder (currently not functional, cylinder just continuously rotates)

### Tab 2 - Saved Data
  - Allows the user to select a saved session and play back the data for that session (can select session but doesn't do anything)
  - Will playback the data from that session in realtime (currently not functional)
  
### Tab 3 - Devices
  - Start BLE scanning for devices
  - Connect to the BLE wearable and display if the wearable is connected or not
