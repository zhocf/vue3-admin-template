import "vue-router"
import {RouteMetaType} from "./src";

declare module 'vue-router' {
    interface RouteMeta extends RouteMetaType {
    }
}
