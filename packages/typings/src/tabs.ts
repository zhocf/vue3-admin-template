import type {RouteLocationNormalized} from 'vue-router';
import type {RouteMetaType} from "./route-type";

export type TabDefinition = RouteLocationNormalized & {
    meta: RouteMetaType
};
