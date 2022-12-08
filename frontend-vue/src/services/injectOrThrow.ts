import { inject, InjectionKey, reactive, UnwrapNestedRefs } from "vue";

export function injectOrThrow<T>(key: InjectionKey<T>): UnwrapNestedRefs<T> {
  const object = inject(key);
  if (!object) {
    throw new Error(`${key.toString()} not provided`);
  }
  return reactive(object);
}
