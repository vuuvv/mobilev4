import {
 Type,
 Component,
 Directive,
 Input,
 ViewContainerRef,
 EventEmitter,
 ViewEncapsulation,
 OnInit,
} from '@angular/core';

import { RuntimeCompiler } from '@angular/compiler'

import { ComponentBuilder } from '../core/services';
import { OverlayService, OverlayConfig } from './overlay.service';

const OVERLAY_ID_KEY: string = '$$OVERLAY_ID_KEY$$';

@Directive({selector: "v-overlay-component"})
export class OverlayComponent implements OnInit {
  @Input('config') config: OverlayConfig;

  constructor(
    private overlayService: OverlayService,
    private viewContainerRef: ViewContainerRef,
    private componentBuilder: ComponentBuilder) {
  }

  ngOnInit() {
    let componentRef = this.componentBuilder.createComponent(this.config.componentType, this.viewContainerRef);
    let instance = componentRef.instance;
    let data = this.config.data;
    if (data) {
      for (let key in data) {
        instance[key] = data[key];
      }
    }
    instance[OVERLAY_ID_KEY] = this.config.id;
    this.config.instance = instance;
    this.overlayService.instance(this.config);
  }
}

@Component({
  selector: 'v-overlay',
  templateUrl: 'overlay.html',
})
export class Overlay implements OnInit {
  private overlayConfigs: OverlayConfig[] = [];

  showToast: boolean = false;

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit() {
    this.overlayService.getNewEvent().subscribe((config) => {
      this.overlayConfigs.push(config);
    });

    this.overlayService.getCloseEvent().subscribe((component) => {
      if (component) {
        let id = component[OVERLAY_ID_KEY];
        let index = this.overlayConfigs.findIndex((c) => {
          return c.id === id;
        });
        this.overlayConfigs.splice(index, 1);
      } else {
        this.overlayConfigs = [];
      }
    });

    this.overlayService.getToastEvent().subscribe((config) => {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, config.duration)
    })
  }

  get toastBlock(): string {
    if (this.showToast) {
      return 'block';
    } else {
      return 'none';
    }
  }
}

