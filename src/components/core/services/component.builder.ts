import { NgModule, Injectable, Type, ComponentFactory, ViewContainerRef, ComponentRef } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';

const ID_SYMBOL: string = '$$V_ID';

let COMPONENT_ID:number = 0;


@Injectable()
export class ComponentBuilder {
  private _cacheFactories: {[typeid: number]: ComponentFactory<any>} = {};
  constructor(private compiler: RuntimeCompiler) {
  }

  public createComponentFactory<T>(component: Type<T>) : ComponentFactory<T> {
    let id = component[ID_SYMBOL];
    let factory: ComponentFactory<T> = null;
    if (id) {
      factory = <ComponentFactory<T>> this._cacheFactories[id];
      if (factory) {
        return factory;
      }
    }

    id = ++COMPONENT_ID;
    component[ID_SYMBOL] = id;

    let module = this.createModule(component);
    factory = this.compiler.compileModuleAndAllComponentsSync(module).componentFactories.find((comp) => {
      return comp.componentType === component;
    });

    this._cacheFactories[id] = factory;

    return factory;
  }

  public createComponent<T>(component: Type<T>, viewContainerRef: ViewContainerRef): ComponentRef<T> {
    let factory = this.createComponentFactory(component);
    return viewContainerRef.createComponent(factory);
  }

  private createModule(component: Type<any>): Type<any> {
    @NgModule({
      declarations: [
        component,
      ]
    })
    class RuntimeComponentModule {}

    return RuntimeComponentModule;
  }
}