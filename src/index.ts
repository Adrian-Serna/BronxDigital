//import * as cannon from 'cannon';

import { HemisphericLight, Vector3, SceneLoader, AbstractMesh, Mesh, StandardMaterial, PickingInfo, Ray, Matrix, ArcRotateCamera, Tools, Texture, KeyboardEventTypes, Color3} from '@babylonjs/core'
import { createEngine, createScene, createSkybox, createArcRotateCamera, getMeshesMaterials, setMeshesMaterials, setupVoltajeArcRotateCamera} from './babylon'

import { SampleMaterial } from "./Materials/SampleMaterial"

//import * as viAPI from './virtualInsanityAPI'
const canvas: HTMLCanvasElement = document.getElementById('virtualInsanityCanvas') as HTMLCanvasElement
const engine = createEngine(canvas)
const scene = createScene();
var config: configTools;

var URL_SCENE_JS:string;//Todo pasar a archivo de importacion API


 /** INIT SCENE */

export {
  initBabylonScene
}

function initBabylonScene(srcScene:string){
  window.onload = function(){
    mainConfigTool();
  }
}

/**Function for get the others babylonjs scene data
     * Destined to be used for the console
     * How to use:
     *  1-Declare and fill a vector let scenesUrl.push(url) with the url of each scene -> scenesUrl.push(url)
     *  2-use virualInsanity.mainConfigTool();
    */
   class urlSceneObject{
    fileName: string;
    url:string;
    roomName:string;
    }
    class artisLocation{
        slug:string;
        roomName:string;
        constructor(slug:string, roomName:string){
            this.slug = slug;
            this.roomName = roomName;
        }
    }
    var indexCounter=0;
    var urlsScenes: urlSceneObject[];
    var downloadObjectAsJson = function(exportObj, exportName){
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
    class configTools{
        constructor(){};
    
        urlObject = {};
       
        loadUrls = function(){
          urlsScenes = [];
          var table = document.getElementById("scenesTable").children[0] as HTMLTableElement;
          if(table){
            for(let i=1; i<table.rows.length;i++){
              var item = new urlSceneObject();
              console.log(table.rows[i].cells[0].innerHTML)
              item.roomName = table.rows[i].cells[0].innerHTML;
              console.log(table.rows[i].cells[1].innerHTML)
              item.fileName = table.rows[i].cells[1].innerHTML;
              console.log(table.rows[i].cells[2].innerHTML)
              item.url = table.rows[i].cells[2].innerHTML;
              if(item.fileName!=""&&item.url!=""){
                urlsScenes.push(item);
              } 
            }
          }
        }
        generateConfigFile=function(){
        
        this.loadUrls();
        
        var artistIndex: artisLocation[];
        artistIndex=[];
    
            if(urlsScenes.length==0){
                console.log("The scenesUrl is void, fill the vector with the url and name of each scene")
            }else{
    
                urlsScenes.forEach(urlScene => {
                    SceneLoader.LoadAssetContainer(urlScene.url, urlScene.fileName, scene, function (container) {
                        var meshes = container.meshes;
                        var slug:string;
                        meshes.forEach(meshElement => {
                            let meshNames: string[] = meshElement.name.split(".");
                            if( meshNames[0] === "Artist" ){
                                if(meshElement.name.split(".")[2] !== null){
                                    slug = meshElement.name.split(".")[2].toLowerCase();
                                    artistIndex.push(new artisLocation(slug,urlScene.roomName));
                                    
                                }
                            }
                        });
                        indexCounter++;
                        if(indexCounter>=urlsScenes.length){
                          downloadObjectAsJson(artistIndex, "scenes");
                          //downloadObjectAsJson(urlsScenes, "urlListScenes");
                        }
                    });
                    
                });
                
            }
        }
    }
    export{
      mainConfigTool
    }
    var mainConfigTool = function(){
        config = new configTools();
        var buttonGo=document.getElementById('generateJson');
        console.log(buttonGo);
        buttonGo.addEventListener('click', (e) => {
          config.generateConfigFile();
        });
        
    }
    