const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")

function createWindow () {
  // Cree la fenetre du navigateur.
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      // devTools: false
    },
    // icon: `file://${path.join(__dirname, "../build/logoez.png")}`
  });
  win.setMenuBarVisibility(false)
  win.maximize()

  // et charger le fichier index.html de l'application.
  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )

  // Ouvre les DevTools.
  win = null;
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
app.whenReady().then(createWindow)

// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()
  }
})