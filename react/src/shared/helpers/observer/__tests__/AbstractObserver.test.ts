/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, expect, it, vi } from 'vitest';
import { AbstractObserver } from '../AbstractObserver';

class TestStore extends AbstractObserver {
  private value = 0;

  increment() {
    this.value += 1;
    this.notifyObservers();
  }

  getValue() {
    return this.value;
  }
}

describe('AbstractObserver', () => {
  describe('subscribe', () => {
    it('should call the observer when notifyObservers is triggered', () => {
      const store = new TestStore();
      const observer = vi.fn();
      store.subscribe(observer);

      store.increment();

      expect(observer).toHaveBeenCalledTimes(1);
    });

    it('should return an unsubscribe function that removes the observer', () => {
      const store = new TestStore();
      const observer = vi.fn();
      const unsubscribe = store.subscribe(observer);

      unsubscribe();
      store.increment();

      expect(observer).not.toHaveBeenCalled();
    });

    it('should only notify remaining observers after unsubscribe', () => {
      const store = new TestStore();
      const observer1 = vi.fn();
      const observer2 = vi.fn();
      const observer3 = vi.fn();
      const unsubscribe = store.subscribe(observer1);
      store.subscribe(observer2);
      store.subscribe(observer3);

      unsubscribe();
      store.increment();

      expect(observer1).not.toHaveBeenCalled();
      expect(observer2).toHaveBeenCalledTimes(1);
      expect(observer3).toHaveBeenCalledTimes(1);
    });

    it('should notify all subscribers on each change', () => {
      const store = new TestStore();
      const observer = vi.fn();
      store.subscribe(observer);

      store.increment();
      store.increment();

      expect(observer).toHaveBeenCalledTimes(2);
    });
  });
});
