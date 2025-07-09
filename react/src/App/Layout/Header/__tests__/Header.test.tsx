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

import { renderSuspense } from '@pplancq/svg-react/tests';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('should render the header element', async () => {
    await renderSuspense(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render the logo with correct aria-label and role', async () => {
    await renderSuspense(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const homeLink = screen.getByLabelText('Hub Microcks.io Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('tabindex', '0');

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should render the "Contribute" link with correct href', async () => {
    await renderSuspense(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const contributeLink = screen.getByRole('link', { name: /contribute/i });
    expect(contributeLink).toBeInTheDocument();
    expect(contributeLink).toHaveAttribute('href');
  });
});
