'use strict';

let deferredInstallPrompt = null;

const installButton = document.getElementById('btnInstall');

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

installButton.addEventListener('click', installPWA);

window.addEventListener('appinstalled', logAppInstalled);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA(evt) {
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribute('hidden', true);
}

function logAppInstalled(evt) {
    console.log('App was installed.', evt);
}