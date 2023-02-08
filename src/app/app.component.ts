import { Component, OnDestroy, OnInit } from '@angular/core'
// import { ipcRenderer } from 'electron'

// const { ipcRenderer } = window.require('electron');
// import fs from 'fs'


//  const {remote} =require("electron")
// const ipcRenderer = remote.ipcRenderer;


// import ipcRenderer = Electron.Renderer.ipcRenderer;

import {IpcRenderer} from 'electron';

declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer
    };
  }
}

const { ipcRenderer } = window.require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy() {
    console.log(`Window opened at: ${new Date().toString()}`)

    // fs.appendFileSync('new.txt', `Window closed at: ${new Date().toString()}`)
  }
  ngOnInit() {
    console.log(`Window closed at: ${new Date().toString()}`)


    // fs.appendFileSync('new.txt', `Window opened at: ${new Date().toString()}`)
  }
  title = 'vaibhav'
  vaibhav(): string {
    const date = new Date().toString()

    localStorage.setItem('time', date)

    return date
  }

 public senddata(){
    console.log("im calling")
   const datenow = new Date().toString()
   // ipcRenderer.send("msg" ,"hello from render")
   ipcRenderer.send("msg" ,`${datenow} start Now`)

  }

  public enddata(){
    const datenow = new Date().toString()

    ipcRenderer.send("end" ,`${datenow} end Now`)
  }
}
