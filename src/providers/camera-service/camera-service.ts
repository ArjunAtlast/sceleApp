import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

import 'rxjs/add/operator/map';

@Injectable()
export class CameraService {
  constructor(public camera: Camera, public crop: Crop) {

  }

  takePicture(targetWidth:number, targetHeight:number, quality:number): Promise<any> {
    //options
    const options: CameraOptions = {
      quality: quality,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: targetWidth,
      targetWidth: targetHeight
    };

    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((imagePath) => {
        if(imagePath) resolve(imagePath);
      }).catch(error => {
        console.log(error);
      });
    });

  }

  takeSquarePicture(targetWidth:number, targetHeight:number, quality:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.takePicture(targetWidth, targetHeight, quality).then((imagePath) => {
        return this.crop.crop(imagePath, {quality: 100})
      }).then((newPath) => {
        if(newPath) resolve(newPath);
      }).catch(error => {
        console.log(error);
      });
    });
  }

  browsePicture(targetWidth:number, targetHeight:number): Promise<any> {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: targetWidth,
      targetWidth: targetHeight
    };

    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((imagePath) => {
        if(imagePath) resolve(imagePath);
      }).catch(error => {
        console.log(error);
      });
    });

  }

  browseSquarePicture(targetWidth:number, targetHeight:number) {
    return new Promise((resolve, reject) => {
      this.browsePicture(targetWidth, targetHeight).then((imagePath) => {
        return this.crop.crop(imagePath, {quality: 100});
      }).then((newPath) => {
        if(newPath) resolve(newPath);
      }).catch(error => {
        console.log(error);
      });
    });
  }

}
