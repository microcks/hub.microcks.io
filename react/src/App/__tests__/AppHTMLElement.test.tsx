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

import { waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { App } from '../App';
import { AppHTMLElement } from '../AppHTMLElement';

vi.mock('../App', () => ({
  App: () => <div data-testid="app-mock">AppMock</div>,
}));

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(),
}));

describe('AppHTMLElement', () => {
  let container: HTMLElement;
  const render = vi.fn();
  const unmount = vi.fn();
  (createRoot as Mock).mockImplementation(() => ({
    render,
    unmount,
  }));

  customElements.define('app-html-element', AppHTMLElement);

  beforeEach(() => {
    container = document.createElement('app-html-element') as HTMLElement;
  });

  afterEach(() => {
    container.remove();
  });

  it('should mount the React component in the custom element', () => {
    document.body.appendChild(container);

    expect(createRoot as Mock).toHaveBeenCalledWith(expect.anything());
    expect(render).toBeCalledWith(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    expect(unmount).not.toHaveBeenCalled();
  });

  it('should unmount the React component when removed from the DOM', async () => {
    document.body.appendChild(container);

    expect(unmount).not.toHaveBeenCalled();

    container.remove();

    await waitFor(() => {
      expect(unmount).toHaveBeenCalledWith();
    });
  });

  it('should not unmount when element is removed and re-added to the DOM', async () => {
    document.body.appendChild(container);
    container.remove();
    document.body.appendChild(container);

    await waitFor(() => {
      expect(unmount).not.toHaveBeenCalled();
    });
  });
});
